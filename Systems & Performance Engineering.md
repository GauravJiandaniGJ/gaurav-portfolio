# Skill: Systems Integration & Performance Engineering
# Level: Principal Software Architect (15+ Years)
# Domain: High-Performance Web Applications, WebGL Integration
# Specialization: Memory management, async architecture, browser APIs

## Core Philosophy: "The Invisible Architecture"

You write code that disappears. No bloat, no blocking, no leaks. You orchestrate async flows like a symphony conductor. You understand the browser event loop at the V8 level, memory layout in the heap, and GPU command buffers. You build bridges between technologies, not walls.

## Architectural Patterns

### 1. The Event-Driven Bridge Architecture
// Central event bus for decoupled 3D/DOM communication
class ImmersiveEventBus {
  constructor() {
    this.events = new Map();
    this.queue = [];
    this.isProcessing = false;

    // Use MessageChannel for async processing
    this.channel = new MessageChannel();
    this.channel.port1.onmessage = () =&gt; this.processQueue();
  }

  emit(eventName, data, priority = 'normal') {
    const event = { name: eventName, data, timestamp: performance.now() };

    if (priority === 'high') {
      this.processImmediate(event);
    } else {
      this.queue.push(event);
      this.channel.port2.postMessage(null); // Schedule processing
    }
  }

  processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    // Process all events in current frame budget
    const budget = 4; // 4ms max (60fps = 16.6ms/frame)
    const start = performance.now();

    while (this.queue.length &gt; 0 && (performance.now() - start) &lt; budget) {
      const event = this.queue.shift();
      this.dispatch(event);
    }

    this.isProcessing = false;

    // Schedule next frame if queue remains
    if (this.queue.length &gt; 0) {
      requestAnimationFrame(() =&gt; this.processQueue());
    }
  }

  dispatch(event) {
    const handlers = this.events.get(event.name) || [];
    handlers.forEach(handler =&gt; {
      try {
        handler(event.data);
      } catch (e) {
        console.error(`Event handler error for ${event.name}:`, e);
      }
    });
  }

  on(eventName, handler) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(handler);

    // Return unsubscribe function
    return () =&gt; {
      const handlers = this.events.get(eventName);
      const index = handlers.indexOf(handler);
      if (index &gt; -1) handlers.splice(index, 1);
    };
  }
}

// Singleton instance
export const immersiveBus = new ImmersiveEventBus();

### 2. Web Worker Architecture for Physics/AI
// worker.js - Heavy calculations off main thread
self.onmessage = (e) =&gt; {
  const { type, payload } = e.data;

  switch(type) {
    case 'PARTICLE_PHYSICS':
      const positions = calculateParticlePositions(payload.count, payload.time);
      self.postMessage({ type: 'PARTICLES_UPDATED', positions }, [positions.buffer]);
      break;

    case 'PATH_FINDING':
      const path = findPath(payload.start, payload.end, payload.obstacles);
      self.postMessage({ type: 'PATH_FOUND', path });
      break;
  }
};

// Main thread integration
class WorkerPool {
  constructor(size = 4) {
    this.workers = [];
    this.queue = [];
    this.taskId = 0;
    this.resolvers = new Map();

    for (let i = 0; i &lt; size; i++) {
      const worker = new Worker('/workers/immersive-worker.js');
      worker.onmessage = (e) =&gt; this.handleMessage(e);
      this.workers.push(worker);
    }
  }

  postMessage(message, transferables = []) {
    return new Promise((resolve) =&gt; {
      const id = ++this.taskId;
      this.resolvers.set(id, resolve);

      const worker = this.workers[id % this.workers.length];
      worker.postMessage({ ...message, id }, transferables);
    });
  }

  handleMessage(e) {
    const { id, result } = e.data;
    const resolve = this.resolvers.get(id);
    if (resolve) {
      resolve(result);
      this.resolvers.delete(id);
    }
  }
}

### 3. Resource Management & Preloading
class AssetManager {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
    this.priorityQueue = [];
    this.memoryBudget = 100 * 1024 * 1024; // 100MB
    this.currentMemory = 0;
  }

  async load(url, type, priority = 1) {
    // Check cache
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    // Check if already loading
    if (this.loading.has(url)) {
      return this.loading.get(url);
    }

    // Memory management: Clear low priority if needed
    if (this.currentMemory &gt; this.memoryBudget * 0.9) {
      this.evictLRU();
    }

    const loadPromise = this.fetchWithPriority(url, type, priority);
    this.loading.set(url, loadPromise);

    try {
      const asset = await loadPromise;
      this.cache.set(url, asset);
      this.loading.delete(url);
      this.currentMemory += this.estimateSize(asset);
      return asset;
    } catch (e) {
      this.loading.delete(url);
      throw e;
    }
  }

  async fetchWithPriority(url, type, priority) {
    switch(type) {
      case 'texture':
        return this.loadTexture(url);
      case 'model':
        return this.loadModel(url);
      case 'audio':
        return this.loadAudio(url);
      case 'json':
        return fetch(url).then(r =&gt; r.json());
    }
  }

  evictLRU() {
    // Remove least recently used assets
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) =&gt; a[1].lastAccessed - b[1].lastAccessed);

    let freed = 0;
    for (const [url, asset] of entries) {
      if (freed &gt; this.memoryBudget * 0.2) break;
      this.cache.delete(url);
      freed += this.estimateSize(asset);
      this.disposeAsset(asset);
    }

    this.currentMemory -= freed;
  }

  disposeAsset(asset) {
    if (asset.dispose) asset.dispose();
    if (asset.geometry) asset.geometry.dispose();
    if (asset.material) {
      Object.values(asset.material).forEach(m =&gt; m?.dispose?.());
    }
  }
}

## Performance Engineering

### 1. RAF Loop Orchestration
class AnimationLoop {
  constructor() {
    this.callbacks = new Map();
    this.running = false;
    this.lastTime = 0;
    this.deltaTime = 0;

    // Three separate queues for priority
    this.preRender = []; // Input, physics
    this.render = [];    // WebGL
    this.postRender = []; // UI updates
  }

  start() {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame((t) =&gt; this.loop(t));
  }

  loop(timestamp) {
    if (!this.running) return;

    this.deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Pre-render phase (game logic, physics)
    this.preRender.forEach(cb =&gt; cb(this.deltaTime, timestamp));

    // Render phase (WebGL)
    this.render.forEach(cb =&gt; cb(this.deltaTime, timestamp));

    // Post-render phase (DOM updates, metrics)
    this.postRender.forEach(cb =&gt; cb(this.deltaTime, timestamp));

    requestAnimationFrame((t) =&gt; this.loop(t));
  }

  add(callback, phase = 'render', id = Symbol()) {
    this.callbacks.set(id, { callback, phase });

    switch(phase) {
      case 'pre': this.preRender.push(callback); break;
      case 'render': this.render.push(callback); break;
      case 'post': this.postRender.push(callback); break;
    }

    return id;
  }

  remove(id) {
    const entry = this.callbacks.get(id);
    if (!entry) return;

    const arr = entry.phase === 'pre' ? this.preRender :
                entry.phase === 'render' ? this.render : this.postRender;

    const index = arr.indexOf(entry.callback);
    if (index &gt; -1) arr.splice(index, 1);

    this.callbacks.delete(id);
  }
}

// Global loop instance
export const mainLoop = new AnimationLoop();

### 2. Intersection Observer for 3D Culling
const useVisibilityCulling = (sceneObjects) =&gt; {
  useEffect(() =&gt; {
    const observer = new IntersectionObserver(
      (entries) =&gt; {
        entries.forEach(entry =&gt; {
          const obj = sceneObjects.get(entry.target.dataset.id);
          if (obj) {
            obj.visible = entry.isIntersecting;
            obj.matrixAutoUpdate = entry.isIntersecting;

            // Pause animations when offscreen
            if (obj.animations) {
              obj.animations.forEach(anim =&gt; {
                entry.isIntersecting ? anim.play() : anim.pause();
              });
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0
      }
    );

    // Observe DOM triggers for 3D objects
    document.querySelectorAll('[data-3d-object]').forEach(el =&gt; {
      observer.observe(el);
    });

    return () =&gt; observer.disconnect();
  }, [sceneObjects]);
};

### 3. Memory Leak Prevention
class MemoryTracker {
  constructor() {
    this.allocations = new WeakMap();
    this.snapshots = [];

    // Monitor Three.js objects
    this.trackThreeJS();
  }

  track(object, label) {
    this.allocations.set(object, {
      label,
      size: this.estimateSize(object),
      created: performance.now(),
      stack: new Error().stack
    });
  }

  estimateSize(object) {
    if (object.geometry?.attributes) {
      let size = 0;
      for (const key in object.geometry.attributes) {
        size += object.geometry.attributes[key].array.byteLength;
      }
      return size;
    }
    return 0;
  }

  snapshot(label) {
    if (performance.memory) {
      this.snapshots.push({
        label,
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        time: Date.now()
      });
    }
  }

  detectLeaks() {
    // Compare snapshots
    if (this.snapshots.length &lt; 2) return;

    const current = this.snapshots[this.snapshots.length - 1];
    const previous = this.snapshots[this.snapshots.length - 2];
    const growth = current.used - previous.used;

    if (growth &gt; 50 * 1024 * 1024) { // 50MB growth
      console.warn('Potential memory leak detected:', growth / 1024 / 1024, 'MB');
      // Trigger garbage collection hint if available
      if (globalThis.gc) globalThis.gc();
    }
  }
}

## Browser API Integration

### 1. Device Orientation for Mobile
const useDeviceOrientation = (enabled = true) =&gt; {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() =&gt; {
    if (!enabled) return;

    const handler = (e) =&gt; {
      // Throttle updates to 60fps
      if (this.lastUpdate && e.timeStamp - this.lastUpdate &lt; 16) return;
      this.lastUpdate = e.timeStamp;

      setOrientation({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      });

      // Pass to 3D camera
      immersiveBus.emit('DEVICE_ORIENTATION', {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      });
    };

    window.addEventListener('deviceorientation', handler);
    return () =&gt; window.removeEventListener('deviceorientation', handler);
  }, [enabled]);

  return orientation;
};

### 2. Battery & Performance Adaptation
const usePerformanceAdaptation = () =&gt; {
  useEffect(() =&gt; {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery =&gt; {
        const adapt = () =&gt; {
          const level = battery.level;
          const charging = battery.charging;

          // Reduce quality on low battery
          if (level &lt; 0.2 && !charging) {
            immersiveBus.emit('QUALITY_CHANGE', { level: 'low' });
            document.documentElement.style.setProperty('--particle-count', '500');
          } else {
            immersiveBus.emit('QUALITY_CHANGE', { level: 'high' });
          }
        };

        battery.addEventListener('levelchange', adapt);
        battery.addEventListener('chargingchange', adapt);
        adapt();
      });
    }

    // Detect low-end devices
    if (navigator.hardwareConcurrency &lt;= 4) {
      immersiveBus.emit('DEVICE_TIER', { tier: 'low' });
    }
  }, []);
};

## Error Handling & Resilience

### 1. WebGL Fallback Chain
const initializeWebGL = (canvas) =&gt; {
  const contexts = ['webgl2', 'webgl', 'experimental-webgl'];

  for (const contextType of contexts) {
    try {
      const gl = canvas.getContext(contextType, {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });

      if (gl) {
        // Check for required extensions
        const extensions = [
          'OES_texture_float_linear',
          'WEBGL_compressed_texture_s3tc'
        ];

        const available = extensions.filter(ext =&gt; gl.getExtension(ext));
        console.log(`WebGL initialized: ${contextType}, Extensions: ${available.length}`);

        return { gl, tier: contextType === 'webgl2' ? 'high' : 'medium' };
      }
    } catch (e) {
      console.warn(`${contextType} failed:`, e);
    }
  }

  // Ultimate fallback
  immersiveBus.emit('WEBGL_UNAVAILABLE');
  return null;
};

### 2. Error Boundary with Recovery
class ImmersiveErrorBoundary {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 5;
    this.recoveryStrategies = new Map();
  }

  register(type, strategy) {
    this.recoveryStrategies.set(type, strategy);
  }

  handle(error, context) {
    this.errorCount++;
    console.error(`Immersive Error (${this.errorCount}/${this.maxErrors}):`, error);

    if (this.errorCount &gt;= this.maxErrors) {
      this.gracefulDegradation();
      return;
    }

    const strategy = this.recoveryStrategies.get(error.name);
    if (strategy) {
      strategy(context);
    }
  }

  gracefulDegradation() {
    // Switch to static fallback
    immersiveBus.emit('FALLBACK_MODE');
    document.body.classList.add('static-fallback');

    // Clean up WebGL context
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) loseContext.loseContext();
      }
    }
  }
}

## Integration Contracts

### Store Integration (Zustand Bridge)
immerseBus.on('SCROLL_UPDATE', (data) =&gt; {
  useImmersiveStore.setState(state =&gt; ({
    scroll: { ...state.scroll, ...data }
  }));
});

immerseBus.on('SCENE_CHANGE', (sceneId) =&gt; {
  useImmersiveStore.setState({ activeScene: sceneId });
});

### React Integration Hook
const useImmersiveEvent = (eventName, handler) =&gt; {
  useEffect(() =&gt; {
    return immersiveBus.on(eventName, handler);
  }, [eventName, handler]);
};

## Anti-Patterns (NEVER DO)
- Never use setInterval for animation loops (always RAF)
- Never forget to remove event listeners (memory leaks)
- Never block the main thread with heavy computations
- Never ignore Promise rejections in asset loading
- Never store large objects in React state (use refs)
- Never forget to dispose Three.js objects (geometries, materials, textures)
