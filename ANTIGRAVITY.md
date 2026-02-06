@agent Build a scroll-driven 3D immersive portfolio website for Gaurav Jiandani (gauravjiandani.com) using the attached 5 skill files (html-css-architecture.md, react-architecture.md, three-js-architecture.md, gsap-animation.md, systems-integration.md).

## Project Context
Reference website: https://www.sebastien-lempens.com
Tech Stack: Next.js 14, React 18, TypeScript, React Three Fiber (@react-three/fiber), Three.js, GSAP, Lenis, Zustand, Tailwind CSS

## Architecture Requirements

### 1. Overall Structure (Dual-Layer Pattern)
Create a "dual-layer" architecture:
- **Layer 1 (Fixed)**: WebGL Canvas (react-three-fiber) with 3D Paris city environment, car navigation, and scroll-driven camera
- **Layer 2 (Scrollable)**: HTML overlay with GSAP ScrollTrigger events that control the 3D camera position
- Use Lenis for smooth scrolling with react-three-fiber synchronization

### 2. 3D Scene Implementation (using three-js-architecture.md)
Build a procedurally generated 3D environment:
- **Eiffel Tower**: Mesh constructed from geometric primitives (cylinder segments) with LOD support
- **car Model**: Compound object (deck, wheels, handlebar, light) that becomes visible during "journey" section
- **Paris Streets**: Ground plane with custom shader material for asphalt effect
- **Golden Hour Lighting**: Directional light (warm orange #ff6b35) + ambient light with fog
- **Particles**: 1000+ floating dust particles (golden hour atmosphere)
- **Camera Rig**: CatmullRomCurve3 path that interpolates based on scroll progress

### 3. Scroll Sections (5 total, 500vh total height)
Implement these scroll sections with camera transitions:
1. **Hero** (0-20%): Camera high vantage, looking down at Paris city
2. **car Journey** (20-40%): Street-level camera follows car path through city
3. **Ascension/Eiffel** (40-60%): Camera rises up Eiffel tower structure
4. **Skydiving** (60-80%): Camera high altitude, looking down at city grid
5. **Contact** (80-100%): Return to street level with contact form

### 4. UI Components (using html-css-architecture.md)
- Glass morphism cards with `backdrop-filter: blur(20px)`
- Fixed navigation with `mix-blend-mode: difference`
- Scroll progress bar (top of viewport)
- Loading screen with "Initializing Experience" text
- Text splitting animations for character reveal
- Magnetic buttons that follow cursor

### 5. State Management (using react-architecture.md)
Implement Zustand store with slices:
```typescript
interface ImmersiveState {
  scroll: { progress: number; velocity: number; direction: number }
  scene: { current: string; cameraPosition: Vector3; focusPoint: Vector3 }
  interaction: { hovered: string | null; cursor: string }
}