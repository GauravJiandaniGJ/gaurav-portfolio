# Skill: Three.js & React Three Fiber Architecture
# Level: Technical Director (15+ Years)
# Domain: WebGL 3D Portfolio Experiences
# Specialization: Scroll-driven cinematography, procedural environments

## Core Philosophy: "Film Director Mentality"

You are not building a 3D website; you are directing an interactive film. Every camera movement is a dolly shot, every light placement is a deliberate cinematographic choice. You understand the Three.js rendering pipeline at the shader level.

## Architectural Layers

### 1. Scene Composition Architecture
// The "Cinematic Scene" pattern
const CinematicScene = () =&gt; {
  return (
    &lt;Canvas
      camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 5, 10] }}
      dpr={[1, 2]} // Responsive pixel ratio
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) =&gt; {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    &gt;
      &lt;CustomCameraRig /&gt;
      &lt;LightingDirector /&gt;
      &lt;EnvironmentComposer /&gt;
      &lt;PostProcessingPipeline /&gt;
    &lt;/Canvas&gt;
  );
};

### 2. The Camera Rig (Cinematic Movement)
interface CameraKeyframe {
  position: Vector3Tuple;
  lookAt: Vector3Tuple;
  fov: number;
  focalLength: number;
  ease: string;
}

const CameraRig = () =&gt; {
  const camera = useThree((state) =&gt; state.camera);
  const scrollProgress = useImmersiveStore((state) =&gt; state.scroll.progress);

  // Define cinematographic path (Paris tour)
  const path = useMemo(() =&gt; new CatmullRomCurve3([
    new THREE.Vector3(20, 5, 20),    // Start: High vantage
    new THREE.Vector3(10, 2, 10),    // Approach street
    new THREE.Vector3(0, 1, 0),      // Street level (car)
    new THREE.Vector3(-10, 50, -10), // Skydiving ascent
  ]), []);

  useFrame((state) =&gt; {
    const t = scrollProgress;

    // Position on curve
    const position = path.getPoint(t);
    const lookAt = path.getPoint(t + 0.01);

    // Smooth damping (cinematic feel)
    camera.position.lerp(position, 0.05);

    // Dynamic FOV based on velocity (speed effect)
    const velocity = useImmersiveStore.getState().scroll.velocity;
    const targetFov = 45 + Math.abs(velocity) * 10;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
    camera.updateProjectionMatrix();

    // Look ahead with slight lag
    const targetLookAt = new THREE.Vector3(...lookAt);
    camera.lookAt(targetLookAt);
  });

  return null;
};

### 3. Procedural Paris Environment
const ProceduralParis = () =&gt; {
  return (
    &lt;group&gt;
      {/* Ground plane with shader material for asphalt */}
      &lt;mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow&gt;
        &lt;planeGeometry args={[200, 200, 128, 128]} /&gt;
        &lt;asphaltShaderMaterial
          roughness={0.8}
          color="#333333"
          time={0}
        /&gt;
      &lt;/mesh&gt;

      {/* Instanced buildings for performance */}
      &lt;InstancedBuildings count={50} /&gt;

      {/* Eiffel Tower - LOD (Level of Detail) */}
      &lt;Detailed distances={[0, 50, 150]}&gt;
        &lt;EiffelTowerDetail /&gt;  // High poly
        &lt;EiffelTowerMedium /&gt;  // Medium
        &lt;EiffelTowerLow /&gt;     // Low poly / billboard
      &lt;/Detailed&gt;

      {/* Wind turbines (symbolic elements) */}
      &lt;WindTurbines positions={[[20, 0, -20], [-30, 0, -40]]} /&gt;

      {/* Volumetric fog for golden hour */}
      &lt;fog attach="fog" args={['#ff9d5c', 10, 150]} /&gt;
    &lt;/group&gt;
  );
};

## Advanced Materials & Shaders

### Custom Golden Hour Shader
const GoldenHourMaterial = shaderMaterial(
  {
    uTime: 0,
    uSunPosition: new THREE.Vector3(10, 20, -50),
    uColorWarm: new THREE.Color('#ff6b35'),
    uColorCool: new THREE.Color('#004e89'),
  },
  // Vertex
  `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  `
    uniform float uTime;
    uniform vec3 uSunPosition;
    uniform vec3 uColorWarm;
    uniform vec3 uColorCool;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float sunAlignment = dot(viewDirection, normalize(uSunPosition));

      // Fresnel effect for atmospheric glow
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

      vec3 color = mix(uColorCool, uColorWarm, sunAlignment * 0.5 + 0.5);
      color = mix(color, vec3(1.0, 0.8, 0.6), fresnel * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GoldenHourMaterial });

### Reflection Probes for Realism
const EnvironmentProbe = () =&gt; {
  const { scene } = useThree();

  useEffect(() =&gt; {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    // Generate environment map from scene
    const renderTarget = pmremGenerator.fromScene(scene);
    scene.environment = renderTarget.texture;

    return () =&gt; {
      renderTarget.dispose();
      pmremGenerator.dispose();
    };
  }, [scene]);

  return null;
};

## Particle Systems (Atmospheric Effects)

### GPU-Animated Particles (GPGPU)
const AtmosphericParticles = () =&gt; {
  const size = 64; // 64x64 particles
  const count = size * size;

  // Position texture (RGBA = xyz + life)
  const positionTexture = useFBO(size, size, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
  });

  // Simulation material
  const simulationMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPositions: { value: null },
      uScrollVelocity: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D uPositions;
      uniform float uScrollVelocity;

      void main() {
        vec4 pos = texture2D(uPositions, vUv);

        // Wind effect based on scroll velocity
        pos.x += uScrollVelocity * 0.1;
        pos.y += sin(uTime + pos.x) * 0.01;

        // Reset if out of bounds
        if(pos.x &gt; 50.0) pos.x = -50.0;

        gl_FragColor = pos;
      }
    `,
  });

  useFrame((state) =&gt; {
    simulationMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    simulationMaterial.uniforms.uScrollVelocity.value =
      useImmersiveStore.getState().scroll.velocity;
  });

  return (
    &lt;points&gt;
      &lt;bufferGeometry&gt;
        &lt;bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        /&gt;
      &lt;/bufferGeometry&gt;
      &lt;pointsMaterial size={0.5} color="#fff" transparent opacity={0.6} /&gt;
    &lt;/points&gt;
  );
};

## Post-Processing Pipeline

const PostProcessing = () =&gt; {
  return (
    &lt;EffectComposer&gt;
      &lt;DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={3}
      /&gt;
      &lt;Bloom
        intensity={0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
      /&gt;
      &lt;ChromaticAberration offset={[0.001, 0.001]} /&gt;
      &lt;Vignette eskil={false} offset={0.1} darkness={0.5} /&gt;

      {/* Tone mapping for golden hour */}
      &lt;ToneMapping mode={ToneMappingMode.ACESFilmic} /&gt;
    &lt;/EffectComposer&gt;
  );
};

## Optimization Strategies

### 1. Occlusion Culling
const useFrustumCulling = (meshRef, bounds) =&gt; {
  const frustum = new THREE.Frustum();
  const projScreenMatrix = new THREE.Matrix4();

  useFrame(({ camera }) =&gt; {
    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);

    if (meshRef.current) {
      meshRef.current.visible = frustum.intersectsBox(bounds);
    }
  });
};

### 2. Texture Atlasing
// Combine multiple UI textures into single atlas
const textureAtlas = useTexture('/atlas/ui-atlas.png');
textureAtlas.repeat.set(0.25, 0.25); // Use first quadrant

### 3. Geometry Instancing
const InstancedTrees = ({ count = 100 }) =&gt; {
  const meshRef = useRef();

  useEffect(() =&gt; {
    const dummy = new THREE.Object3D();
    for (let i = 0; i &lt; count; i++) {
      dummy.position.set(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      );
      dummy.scale.setScalar(0.8 + Math.random() * 0.4);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    &lt;instancedMesh ref={meshRef} args={[null, null, count]}&gt;
      &lt;treeGeometry /&gt;
      &lt;treeMaterial /&gt;
    &lt;/instancedMesh&gt;
  );
};

## Integration Points

### React Three Fiber ↔ GSAP Bridge
const useScrollAnimation = (targetRef, animationConfig) =&gt; {
  useEffect(() =&gt; {
    const trigger = ScrollTrigger.create({
      trigger: targetRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) =&gt; {
        // Update Three.js uniforms directly
        if (targetRef.current.material) {
          targetRef.current.material.uniforms.uProgress.value = self.progress;
        }
      }
    });

    return () =&gt; trigger.kill();
  }, [targetRef, animationConfig]);
};

## Anti-Patterns (NEVER DO)
- Never create new Vector3/Euler in render loops (reuse objects)
- Never use standard materials for large counts (use ShaderMaterial + Instancing)
- Never load heavy models without Draco compression
- Never update geometry attributes every frame
- Never use real-time shadows for static objects (bake lightmaps)
