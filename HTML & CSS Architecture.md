# Skill: Semantic HTML & Advanced CSS Architecture
# Level: Senior Architect (15+ Years)
# Domain: 3D Immersive Portfolio Websites
# Author: Elite Frontend Architect

## Core Philosophy
You don't write CSS; you architect design systems that breathe. Every selector is a calculated decision impacting performance, accessibility, and 3D pipeline integration. You think in component ecosystems, not isolated files.

## Mandatory Architectural Patterns

### 1. CUBE CSS Methodology (Customized for 3D)
- **Composition**: Global layout primitives (`.reel`, `.cluster`, `.switcher`) handling 3D canvas containers
- **Utilities**: Design token-driven utilities (fluid typography, dynamic spacing using `clamp()`)
- **Block**: Component-specific styles (`.hero-canvas`, `.scroll-proxy-container`)
- **Exceptions**: State-based modifiers (`.is-scrolling`, `.is-transitioning`, `.has-webgl-support`)

### 2. CSS Custom Properties Architecture (The "Variable API")
Define a hierarchical token system that bridges JavaScript and WebGL:

:root {
  /* Environment */
  --env-primary-hue: 25;
  --env-golden-hour-opacity: 0.8;

  /* 3D Canvas Integration */
  --canvas-z-index: 1;
  --ui-z-index: 10;
  --overlay-z-index: 100;

  /* Scroll Progress (JS-injected) */
  --scroll-progress: 0;
  --section-progress: 0;

  /* Motion Preferences */
  --motion-duration: 0.6s;
  --motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="paris-sunset"] {
  --sky-gradient-start: #ff6b35;
  --sky-gradient-end: #004e89;
  --fog-density: 0.02;
}

### 3. The "Scroll Proxy" DOM Structure
For 3D scroll-driven sites, implement a dual-layer architecture:

<div class="viewport-container">
  <!-- Fixed 3D Canvas Layer -->
  <div class="webgl-canvas-container" aria-hidden="true">
    <canvas id="gl"></canvas>
  </div>

  <!-- Scroll Proxy Layer (Invisible, drives 3D) -->
  <div class="scroll-proxy" style="height: 400vh;"></div>

  <!-- UI Overlay Layer -->
  <main class="ui-layer">
    <section class="scene-trigger" data-scene="car-ride" data-camera-position="12,4,8"></section>
    <section class="scene-trigger" data-scene="eiffel-approach" data-camera-position="0,10,20"></section>
  </main>
</div>

## Advanced Layout Systems

### CSS Grid for 3D UI Overlays
Implement asymmetric grids that complement perspective cameras:

.ui-overlay-grid {
  display: grid;
  grid-template-columns:
    [viewport-start]
    minmax(1rem, 1fr)
    [content-start]
    minmax(0, 65ch)
    [content-end]
    minmax(1rem, 1fr)
    [viewport-end];
  grid-template-rows: 100vh; /* Full viewport lock */
  pointer-events: none; /* Let clicks pass to 3D */
}

.ui-element {
  pointer-events: auto; /* Re-enable for interactive elements */
  grid-column: content-start / content-end;
  transform: translateY(calc(var(--scroll-progress) * -100px)); /* Parallax hook */
}

### Container Queries for Component Adaptation
@container (min-width: 700px) {
  .portfolio-card {
    --card-direction: row;
    --image-size: 40cqi;
  }
}

@container (aspect-ratio > 16/9) {
  .cinematic-container {
    --focal-point: center 30%;
  }
}

## Performance-Critical Patterns

### Containment for 3D Coexistence
.webgl-canvas-container {
  contain: layout style paint;
  content-visibility: auto;
  will-change: transform;
}

.scroll-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

### Critical CSS Injection
Identify Above-the-Fold 3D loader UI and inline:
- Canvas initialization styles
- Loading animation keyframes
- First scene color palette

## Accessibility in Immersive Spaces

### Reduced Motion Support
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration: 0.01ms;
    --camera-smoothing: 0;
  }

  .scroll-proxy {
    display: none; /* Fallback to static grid */
  }

  .static-fallback-grid {
    display: grid;
  }
}

### Semantic Structure for Screen Readers
<nav aria-label="Scene navigation">
  <button aria-current="true" aria-describedby="scene-car">
    car Tour Section
  </button>
</nav>
<div id="scene-car" role="img" aria-label="3D visualization of Paris streets"></div>

## Integration Contracts (For JS/3D Teams)

### CSS → JavaScript API
Expose computed styles as configuration:
const styles = getComputedStyle(document.documentElement);
const sceneConfig = {
  fogColor: styles.getPropertyValue('--fog-color').trim(),
  cameraFov: parseInt(styles.getPropertyValue('--camera-fov')),
  goldenHourIntensity: parseFloat(styles.getPropertyValue('--golden-hour-opacity'))
};

### Scroll-Driven CSS Variables
The JavaScript scroll engine MUST update these custom properties:
--scroll-velocity: 0; /* instantaneous px/ms */
--scroll-direction: 1; /* 1 = down, -1 = up */
--scene-0-progress: 0-1;
--scene-1-progress: 0-1;

## Anti-Patterns (NEVER DO)
- Never use `vh` units for 3D canvas sizing (handle resize in JS)
- Never animate `width`/`height` (use `scale` or `transform`)
- Never use `* { margin: 0; }` (use specific reset)
- Never nest deeper than 3 levels for UI components
