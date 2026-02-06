# Skill: React Architecture for Immersive 3D Experiences
# Level: Principal Engineer (15+ Years)
# Domain: WebGL-Integrated React Applications
# Stack: React 18+, React Three Fiber, Zustand, React-Spring

## Architectural Paradigm: "The Dual-Tree Pattern"

You manage two concurrent realities: The React Component Tree and the 3D Scene Graph. They are not the same. Your job is to synchronize them without coupling.

### Core Architecture
App
├── Canvas (react-three-fiber) - The WebGL Reality
│   ├── SceneManager
│   ├── CameraRig
│   ├── EnvironmentController
│   └── SceneObjects (Paris, car, Particles)
├── DOMOverlay (React) - The HTML Reality
│   ├── ScrollManager (Lenis/GSAP ScrollTrigger)
│   ├── UIOverlay
│   └── Navigation
└── BridgeLayer (Zustand + Context)
    ├── ScrollState
    ├── SceneState
    └── InteractionState

## State Management: The Zustand Slice Pattern

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useImmersiveStore = create(
  subscribeWithSelector((set, get) => ({
    // Scroll State (High-frequency updates)
    scroll: {
      progress: 0,
      velocity: 0,
      direction: 1,
      section: 'intro',
    },

    // 3D Scene State
    scene: {
      current: 'paris-sunset',
      targetCamera: { x: 0, y: 5, z: 10 },
      focusPoint: null,
      envPreset: 'sunset',
    },

    // Interaction State
    interaction: {
      hovered: null,
      active: null,
      cursor: 'default',
      isDragging: false,
    },

    // Actions (Immersive transitions)
    transitionToScene: (sceneId, cameraPosition) => {
      // Orchestrate DOM + WebGL transition
      get().dom.startExitAnimation();
      get().webgl.prepareScene(sceneId);
      setTimeout(() => get().dom.enterScene(sceneId), 600);
    },

    // Derived state selectors
    isInParis: () => get().scene.current.startsWith('paris'),
  }))
);

// Subscription Pattern for 3D Components (Performance Critical)
useImmersiveStore.subscribe(
  (state) => state.scroll.progress,
  (progress) => {
    // Direct Three.js manipulation (bypass React render)
    camera.position.y = Math.sin(progress * Math.PI) * 10;
  }
);

## Component Patterns

### The "Scene" Component Architecture
interface SceneProps {
  name: string;
  cameraConfig: CameraConfig;
  lightingPreset: LightingPreset;
  onEnter: () => void;
  onExit: () => void;
}

const ParisScene: FC<SceneProps> = ({ name, cameraConfig }) => {
  // Ref-based imperative handles for 3D objects
  const carRef = useRef<Group>(null);
  const eiffelRef = useRef<Mesh>(null);

  // React Three Fiber hooks
  const { scene, camera } = useThree();

  // GSAP integration for complex sequences
  useGSAP(() => {
    if (!carRef.current) return;

    gsap.to(carRef.current.position, {
      x: 100,
      scrollTrigger: {
        trigger: `.scene-${name}`,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });
  }, { scope: scene });

  return (
    <group name={name}>
      <carModel ref={carRef} />
      <Environment preset="sunset" />
      <Particles count={1000} preset="golden-hour" />
    </group>
  );
};

### Scroll-Triggered Scene Manager
const SceneOrchestrator = () => {
  const [currentScene, setScene] = useState('intro');
  const scenes = useMemo(() => [
    { id: 'intro', threshold: 0, component: IntroScene },
    { id: 'car-ride', threshold: 0.2, component: carScene },
    { id: 'skydiving', threshold: 0.6, component: SkydivingScene },
  ], []);

  // High-performance scroll tracking
  useFrame((state, delta) => {
    const scroll = useImmersiveStore.getState().scroll.progress;

    // Determine active scene
    const active = scenes.reduce((acc, scene) =>
      scroll >= scene.threshold ? scene : acc
    , scenes[0]);

    if (active.id !== currentScene) {
      setScene(active.id);
      // Trigger scene transition effects
      state.scene.fog.density = active.id === 'skydiving' ? 0.001 : 0.02;
    }
  });

  const ActiveComponent = scenes.find(s => s.id === currentScene)?.component;
  return ActiveComponent ? <ActiveComponent /> : null;
};

## Performance Architecture

### Instanced Rendering for Particles
const ParticleField = memo(({ count = 10000 }) => {
  const meshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    // GPGPU setup for particle animation
    const dummy = new Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 100
      );
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    }
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffaa00" transparent opacity={0.6} />
    </instancedMesh>
  );
});

### Texture Streaming Strategy
const useHDRI = (preset: string) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    // Progressive loading: Low-res first, HDRI async
    const loader = new RGBELoader();
    loader
      .setDataType(HalfFloatType)
      .load(`/hdr/${preset}-lq.hdr`, (lq) => {
        setTexture(lq);
        loader.load(`/hdr/${preset}-hq.hdr`, setTexture);
      });
  }, [preset]);

  return texture;
};

## Integration Contracts

### Bridge to GSAP ScrollTrigger
export const ScrollBridge = () => {
  useEffect(() => {
    // Sync Lenis smooth scroll with React Three Fiber
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ({ scroll, velocity }) => {
      useImmersiveStore.setState({
        scroll: { progress: scroll / lenis.limit, velocity }
      });
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => lenis.destroy();
  }, []);

  return null;
};

### Error Boundaries for 3D
class WebGLErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <StaticPortfolioFallback />;
    }
    return this.props.children;
  }
}

## Anti-Patterns (NEVER DO)
- Never use useState for scroll position (use refs + direct mutation)
- Never re-create materials/geometries in render loops
- Never use Context for high-frequency updates (use Zustand selectors)
- Never block the main thread with heavy calculations in useEffect
