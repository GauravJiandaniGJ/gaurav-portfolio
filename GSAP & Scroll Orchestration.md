# Skill: GSAP Animation Engineering & Scroll Orchestration
# Level: Creative Technologist (15+ Years)
# Domain: Cinematic Scroll Experiences, Micro-interactions
# Stack: GSAP 3+, ScrollTrigger, SplitText, Observer Plugin, Lenis

## Core Philosophy: "Time-Based Architecture"

Animation is not decoration; it is temporal design. You think in timelines, not keyframes. You understand easing as physics, scrubbing as choreography, and scroll position as the conductor's baton. You build animation systems, not one-off tweens.

## Architectural Patterns

### 1. The Master Timeline Pattern
class MasterTimeline {
  constructor() {
    this.master = gsap.timeline({
      scrollTrigger: {
        trigger: ".smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth lag for weight
        pin: false,
        onUpdate: (self) =&gt; {
          // Broadcast to 3D layer
          useImmersiveStore.setState({
            scrollProgress: self.progress,
            velocity: self.getVelocity()
          });
        }
      }
    });

    this.scenes = new Map();
    this.init();
  }

  addScene(id, timeline, position) {
    this.scenes.set(id, timeline);
    this.master.add(timeline, position);
  }

  init() {
    // Global velocity-based skew effect
    this.master.to(".velocity-skew", {
      skewY: (i, target) =&gt; {
        return useImmersiveStore.getState().velocity * 0.01;
      },
      ease: "none"
    });
  }
}

### 2. Scene-Based Timeline Segmentation
const createParisScene = () =&gt; {
  const tl = gsap.timeline();

  // Section 1: The Approach (0-30%)
  tl.fromTo(".paris-skyline",
    { y: 100, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
    0
  );

  tl.to(".camera-rig", {
    z: -50,
    y: 10,
    duration: 0.3,
    ease: "power1.inOut"
  }, 0);

  // Section 2: Street Level car (30-60%)
  tl.to(".car", {
    x: "100vw",
    duration: 0.3,
    ease: "none"
  }, 0.3);

  // Camera shake based on car speed
  tl.to(".camera-rig", {
    x: "random(-2, 2)",
    y: "+=random(-1, 1)",
    duration: 0.1,
    repeat: 3,
    ease: "rough"
  }, 0.3);

  // Section 3: Ascension/Skydiving (60-100%)
  tl.to(".cloud-layer", {
    y: "-100vh",
    scale: 1.5,
    duration: 0.4,
    ease: "power2.in"
  }, 0.6);

  return tl;
};

## Advanced Scroll Techniques

### 1. Lenis + GSAP Integration (Silky Smooth Scrolling)
export class SmoothScrollEngine {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) =&gt; Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ticker
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) =&gt; {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  scrollTo(target, options = {}) {
    this.lenis.scrollTo(target, {
      offset: 0,
      immediate: false,
      duration: 1.5,
      easing: (t) =&gt; Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  }

  // Sync with 3D camera
  syncWithCamera(cameraRig) {
    this.lenis.on('scroll', ({ velocity, direction }) =&gt; {
      // Pass velocity to 3D for motion blur effects
      cameraRig.velocity = velocity;
      cameraRig.direction = direction;
    });
  }
}

### 2. Text Reveal Architecture (SplitText)
const createTextReveal = (element, type = "chars") =&gt; {
  const split = new SplitText(element, {
    type: type, // "chars", "words", "lines"
    charsClass: "char++",
    wordsClass: "word++"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 20%",
      scrub: 0.5
    }
  });

  // Staggered character animation
  tl.from(split.chars, {
    y: 100,
    opacity: 0,
    rotateX: -90,
    stagger: 0.02,
    transformOrigin: "0% 50% -50",
    ease: "back.out(1.7)"
  });

  // Golden hour glow effect
  tl.to(split.chars, {
    color: "#ff6b35",
    textShadow: "0 0 20px rgba(255,107,53,0.5)",
    stagger: 0.02
  }, "-=0.5");

  return tl;
};

### 3. Parallax Layering System
const ParallaxSystem = () =&gt; {
  useGSAP(() =&gt; {
    // Foreground (fastest)
    gsap.to(".layer-foreground", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Midground
    gsap.to(".layer-midground", {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Background (slowest)
    gsap.to(".layer-background", {
      yPercent: -10,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  return null;
};

## Micro-Interaction Engineering

### 1. Magnetic Button System
const MagneticButton = ({ children }) =&gt; {
  const buttonRef = useRef();

  useGSAP(() =&gt; {
    const button = buttonRef.current;

    button.addEventListener('mousemove', (e) =&gt; {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    button.addEventListener('mouseleave', () =&gt; {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }, []);

  return &lt;button ref={buttonRef}&gt;{children}&lt;/button&gt;;
};

### 2. Cursor Follower with Physics
class CursorPhysics {
  constructor() {
    this.cursor = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.isHovering = false;

    this.init();
  }

  init() {
    // Observer pattern for performance
    Observer.create({
      target: window,
      type: "pointer",
      onMove: (self) =&gt; {
        this.target.x = self.x;
        this.target.y = self.y;
      }
    });

    gsap.ticker.add(() =&gt; this.update());
  }

  update() {
    // Spring physics
    const k = 0.1; // Spring constant
    const d = 0.8; // Damping

    const ax = (this.target.x - this.cursor.x) * k;
    const ay = (this.target.y - this.cursor.y) * k;

    this.velocity.x += ax;
    this.velocity.y += ay;
    this.velocity.x *= d;
    this.velocity.y *= d;

    this.cursor.x += this.velocity.x;
    this.cursor.y += this.velocity.y;

    // Apply to DOM
    gsap.set(".cursor-follower", {
      x: this.cursor.x,
      y: this.cursor.y,
      scale: this.isHovering ? 2 : 1
    });
  }
}

## Scroll-Linked 3D Transitions

### Camera Transition Controller
const CameraScrollController = () =&gt; {
  useGSAP(() =&gt; {
    // Scene 1 to Scene 2 transition
    ScrollTrigger.create({
      trigger: ".transition-point-1",
      start: "top center",
      end: "bottom center",
      onEnter: () =&gt; {
        // Animate 3D scene transition
        gsap.to(".webgl-scene-1", {
          opacity: 0,
          duration: 1
        });
        gsap.from(".webgl-scene-2", {
          opacity: 0,
          duration: 1
        });
      },
      onLeaveBack: () =&gt; {
        // Reverse transition
        gsap.to(".webgl-scene-2", { opacity: 0 });
        gsap.to(".webgl-scene-1", { opacity: 1 });
      }
    });
  });

  return null;
};

## Performance Optimization

### 1. Kill Switch for Inactive Tabs
document.addEventListener("visibilitychange", () =&gt; {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

### 2. Debounced Resize Handler
const debouncedResize = gsap.delayedCall(0.2, () =&gt; {
  ScrollTrigger.refresh();
}).pause();

window.addEventListener("resize", () =&gt; debouncedResize.restart(true));

## Integration Contracts

### CSS Variable Bridge
// GSAP updates CSS variables for 3D usage
gsap.to(document.documentElement, {
  "--scroll-progress": 1,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) =&gt; {
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        self.getVelocity()
      );
    }
  }
});

## Anti-Patterns (NEVER DO)
- Never use scrub: true without lag smoothing (creates jank)
- Never animate width/height/top/left (use transforms)
- Never create ScrollTriggers inside React render loops (memory leaks)
- Never use setState in onUpdate callbacks (infinite loops)
- Never forget to kill() timelines on unmount
