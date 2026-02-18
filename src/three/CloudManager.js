function clamp01(v) {
    return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0, edge1, x) {
    if (edge0 === edge1) return x < edge0 ? 0 : 1;
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
    return a + (b - a) * clamp01(t);
}

function tierValue(table, tier, fallbackTier = 'MEDIUM') {
    if (table && typeof table === 'object' && tier in table) return table[tier];
    if (table && typeof table === 'object' && fallbackTier in table) return table[fallbackTier];
    return 0;
}

function resolveCloudRanges(config) {
    const home = config.HOME_CLOUD_RANGE || [0.0, 0.05];
    const transition = config.TRANSITION_CLOUD_RANGE || config.START_CLOUD_RANGE || [0.05, 0.2];
    const clear = config.CLEAR_CLOUD_RANGE || [transition[1], transition[1] + 0.06];

    return {
        homeStart: home[0],
        homeEnd: home[1],
        transitionStart: transition[0],
        transitionEnd: transition[1],
        clearStart: clear[0],
        clearEnd: clear[1]
    };
}

function computeCloudMaskStrength(progress, ranges, curve) {
    const homeStrength = curve.homeStrength ?? 0.94;
    const revealMinStrength = curve.revealMinStrength ?? 0.2;
    const postStrength = curve.postStrength ?? 0;

    if (progress <= ranges.homeEnd) return homeStrength;

    if (progress <= ranges.transitionEnd) {
        const t = smoothstep(ranges.homeEnd, ranges.transitionEnd, progress);
        return lerp(homeStrength, revealMinStrength, t);
    }

    if (progress <= ranges.clearEnd) {
        const t = smoothstep(ranges.clearStart, ranges.clearEnd, progress);
        return lerp(revealMinStrength, postStrength, t);
    }

    return postStrength;
}

function computeCloudPhase(progress, ranges) {
    if (progress <= ranges.homeEnd) {
        return { phase: 'home', mode: 'HOME_IDLE' };
    }

    if (progress <= ranges.transitionEnd) {
        const t = clamp01((progress - ranges.homeEnd) / Math.max(0.0001, ranges.transitionEnd - ranges.homeEnd));
        if (t < 0.34) return { phase: 'preload', mode: 'TRANSITION_ENTER' };
        if (t < 0.72) return { phase: 'load', mode: 'TRANSITION_LOAD' };
        return { phase: 'reveal', mode: 'TRANSITION_EXIT' };
    }

    if (progress <= ranges.clearEnd) {
        return { phase: 'reveal', mode: 'TRANSITION_EXIT' };
    }

    return { phase: 'idle', mode: 'SECTION_IDLE' };
}

export const CLOUD_OCCLUSION_CONFIG = {
    START_CLOUD_RANGE: [0.03, 0.12],
    END_CLOUD_RANGE: [1.0, 1.0],
    HOME_CLOUD_RANGE: [0.0, 0.03],
    TRANSITION_CLOUD_RANGE: [0.03, 0.2],
    CLEAR_CLOUD_RANGE: [0.2, 0.26],

    // Home should be thick enough to hide unloaded distant chunks.
    CLOUD_DENSITY: 0.98,
    CLOUD_OPACITY: 0.96,
    HOME_CLOUD_OPACITY: 0.9,
    MASK_CLOUD_OPACITY: 0.98,
    CLOUD_FADE_DURATION: 0.8,
    CLOUD_HOME_DENSITY: 1.0,
    CLOUD_TRANSITION_DENSITY: 0.9,
    CLOUD_DRIFT_SPEEDS: {
        left: 0.06,
        right: 0.085,
        ambient: 0.038
    },

    cloudCurve: {
        homeStrength: 0.92,
        revealMinStrength: 0.2,
        postStrength: 0.0
    },

    revealReadinessThreshold: 0.62,

    // Keep hero readable at home by putting dense curtain farther from camera.
    depthOffset: {
        home: -620,
        transition: -220,
        section: -1200
    },

    qualityCount: { LOW: 10, MEDIUM: 16, HIGH: 22 },
    veilCount: { LOW: 3, MEDIUM: 4, HIGH: 5 },
    volume: {
        nearZ: -210,
        farZ: -760,
        width: 1220,
        height: 560,
        wrapPadding: 220
    },
    scale: {
        min: 140,
        max: 320
    },
    opacityMix: {
        homeNear: 0.18,
        transitionNear: 0.5,
        far: 1.0
    },
    drift: {
        lateralAmpMin: 16,
        lateralAmpMax: 44,
        lateralSpeedMin: 0.05,
        lateralSpeedMax: 0.2,
        verticalAmpMin: 4,
        verticalAmpMax: 18,
        verticalSpeedMin: 0.05,
        verticalSpeedMax: 0.2
    },
    flowSpeed: { LOW: 54, MEDIUM: 72, HIGH: 90 },

    // Preload farther while cloud mask is active.
    streamGate: {
        // Hide far placeholders while still preloading offscreen chunks.
        distanceScaleAtHome: 0.62,
        distanceScaleAtTransition: 0.95,
        treeProxyScaleAtHome: 0.62,
        treeProxyScaleAtTransition: 0.9,
        maxStageHome: 2,
        maxStageTransition: 2,
        maxStageLoad: 3,
        offscreenPreloadBoost: 2.2,
        offscreenMaxStage: 2
    },

    readinessSampling: {
        minDistance: 90,
        maxDistance: 1700,
        minForwardDot: -0.2,
        minWeightedSamples: 8,
        treeWeight: 0.4
    }
};

export const WORLD_STREAMING_CONFIG = {
    zones: [
        { id: 'hero', enter: 0.0, exit: 0.14, preloadStart: 0.0, distanceScale: 1.0, treeProxyScale: 0.9, maxStage: 3 },
        { id: 'mid', enter: 0.06, exit: 0.9, preloadStart: 0.02, distanceScale: 1.0, treeProxyScale: 1.0, maxStage: 3 },
        { id: 'far', enter: 0.56, exit: 1.0, preloadStart: 0.36, distanceScale: 1.0, treeProxyScale: 1.0, maxStage: 3 }
    ],
    hysteresis: 0.014,
    readinessThreshold: 0.62
};

export class CloudTransitionManager {
    constructor({ THREE, scene, camera, textureUrl, qualityTier = 'MEDIUM', config = CLOUD_OCCLUSION_CONFIG }) {
        if (!THREE) throw new Error('CloudTransitionManager requires a THREE instance');

        this.THREE = THREE;
        this.scene = scene;
        this.camera = camera;
        this.textureUrl = textureUrl;
        this.qualityTier = qualityTier;
        this.config = config;
        this.ranges = resolveCloudRanges(config);

        this.root = new this.THREE.Group();
        this.root.name = 'cloudTransitionVolume';
        this.root.renderOrder = 9000;

        this.clouds = [];
        this.flowSpeed = tierValue(this.config.flowSpeed, this.qualityTier);
        this.nearAlpha = 0;
        this.farAlpha = 0;
        this.flowDirection = 1;
        this.manualMode = 'AUTO';
        this.manualMaskStrength = null;

        this.state = {
            mode: 'HOME_IDLE',
            phase: 'home',
            transitionStrength: 0,
            maskStrength: 0.94,
            homeStrength: 1,
            maskActive: true,
            fogActive: true,
            fogFactor: 1,
            nearOpacity: 0,
            farOpacity: 0,
            activeTransition: 'start',
            lowReadiness: false
        };

        this.geometry = new this.THREE.PlaneGeometry(1, 1);
        this.texture = new this.THREE.TextureLoader().load(this.textureUrl, (t) => {
            t.colorSpace = this.THREE.SRGBColorSpace;
            t.minFilter = this.THREE.LinearMipmapLinearFilter;
            t.magFilter = this.THREE.LinearFilter;
            t.generateMipmaps = true;
            t.needsUpdate = true;
        });

        this.nearMaterial = new this.THREE.MeshBasicMaterial({
            map: this.texture,
            color: 0xf5f9ff,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            depthTest: true,
            fog: false,
            side: this.THREE.FrontSide,
            premultipliedAlpha: true,
            alphaTest: 0.04
        });

        this.farMaterial = this.nearMaterial.clone();
        this.farMaterial.color = new this.THREE.Color(0xe1e9f2);
        this.farMaterial.opacity = 0;

        this._buildCloudVolume();
        this.scene.add(this.root);
        this.resetForLanding();
    }

    _buildCloudVolume() {
        const count = Math.max(10, Math.round(tierValue(this.config.qualityCount, this.qualityTier)));
        const nearCount = Math.round(count * 0.28);
        const horizonCount = Math.max(5, Math.round(count * 0.38));

        for (let i = 0; i < count; i++) {
            const isNearLayer = i < nearCount;
            const isHorizon = i < horizonCount;
            const mesh = new this.THREE.Mesh(this.geometry, isNearLayer ? this.nearMaterial : this.farMaterial);
            mesh.frustumCulled = true;
            mesh.renderOrder = 9000;

            const node = this._makeCloudNode(i, count, isNearLayer, isHorizon, mesh);
            this.clouds.push(node);
            this.root.add(mesh);
        }
    }

    _makeCloudNode(index, total, isNearLayer, isHorizon, mesh) {
        const vol = this.config.volume;
        const drift = this.config.drift;
        const driftSpeeds = this.config.CLOUD_DRIFT_SPEEDS || {};
        const veilCount = Math.max(3, Math.round(tierValue(this.config.veilCount, this.qualityTier) || 5));
        const isVeil = index < veilCount;
        const depthPct = total <= 1 ? 0.5 : index / (total - 1);
        const spreadScale = 0.42 + depthPct * 0.92;
        const scaleRange = this.config.scale.max - this.config.scale.min;
        const depthRange = Math.abs(vol.farZ - vol.nearZ);

        const baseScale = isVeil
            ? (this.config.scale.max * 2.75)
            : isHorizon
                ? this.config.scale.max * (1.9 + Math.random() * 0.6)
            : (this.config.scale.min + Math.random() * scaleRange) * (isNearLayer ? 1.04 : 0.92);

        const veilStep = vol.width / Math.max(2, veilCount - 1);
        const baseX = isVeil
            ? (-vol.width * 0.5 + index * veilStep)
            : (Math.random() - 0.5) * vol.width * spreadScale;
        const baseY = isVeil
            ? (-42 + index * 7)
            : isHorizon
                ? (-44 + Math.random() * 90)
                : (Math.random() - 0.5) * vol.height * (isNearLayer ? 0.78 : 0.66);
        const baseZ = isVeil
            ? (vol.nearZ - 150 - index * 52)
            : (vol.farZ + depthPct * depthRange + (Math.random() - 0.5) * 60);

        const lane = index % 3;
        const laneDir = lane === 0 ? -1 : lane === 1 ? 1 : (Math.random() < 0.5 ? -1 : 1);
        const laneSpeed =
            lane === 0 ? (driftSpeeds.left ?? 0.06) :
            lane === 1 ? (driftSpeeds.right ?? 0.085) :
            (driftSpeeds.ambient ?? 0.038);

        return {
            mesh,
            isHorizon,
            isVeil,
            baseX,
            baseY,
            z: baseZ,
            baseScale,
            driftDir: laneDir,
            lateralAmp: isVeil ? (6 + Math.random() * 7) : (isHorizon ? (8 + Math.random() * 12) : (drift.lateralAmpMin + Math.random() * (drift.lateralAmpMax - drift.lateralAmpMin))),
            lateralSpeed: isVeil
                ? (laneSpeed * 0.45 + Math.random() * 0.02)
                : isHorizon
                    ? (laneSpeed * 0.7 + Math.random() * 0.03)
                    : (laneSpeed + Math.random() * Math.max(0.01, drift.lateralSpeedMax * 0.35)),
            verticalAmp: isVeil ? (1.2 + Math.random() * 1.6) : (isHorizon ? (1.5 + Math.random() * 3) : (drift.verticalAmpMin + Math.random() * (drift.verticalAmpMax - drift.verticalAmpMin))),
            verticalSpeed: isVeil ? (0.02 + Math.random() * 0.03) : (isHorizon ? (0.03 + Math.random() * 0.04) : (drift.verticalSpeedMin + Math.random() * (drift.verticalSpeedMax - drift.verticalSpeedMin))),
            scalePulseSpeed: isVeil ? (0.03 + Math.random() * 0.03) : (isHorizon ? (0.04 + Math.random() * 0.06) : (0.08 + Math.random() * 0.22)),
            rollSpeed: isVeil ? (0.02 + Math.random() * 0.02) : (isHorizon ? (0.03 + Math.random() * 0.03) : (0.05 + Math.random() * 0.1)),
            flowJitter: isVeil ? (0.22 + Math.random() * 0.08) : (0.78 + Math.random() * 0.44),
            phase: Math.random() * Math.PI * 2,
            baseRoll: isVeil ? ((index - 1) * 0.018) : ((Math.random() - 0.5) * 0.2)
        };
    }

    _syncToCamera() {
        if (!this.camera) return;
        this.root.position.copy(this.camera.position);
        this.root.quaternion.copy(this.camera.quaternion);
    }

    _applyOpacity() {
        this.nearMaterial.opacity = this.nearAlpha;
        this.farMaterial.opacity = this.farAlpha;
    }

    _resetCloudDepths() {
        const vol = this.config.volume;
        const depthRange = Math.abs(vol.farZ - vol.nearZ);
        const veilCount = Math.max(3, Math.round(tierValue(this.config.veilCount, this.qualityTier) || 5));
        for (let i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].isVeil) {
                this.clouds[i].z = vol.nearZ - 150 - i * (260 / veilCount);
            } else {
                this.clouds[i].z = vol.farZ + Math.random() * depthRange;
            }
        }
    }

    setQualityTier(tier) {
        this.qualityTier = tier;
        this.flowSpeed = tierValue(this.config.flowSpeed, this.qualityTier);
    }

    resetForLanding() {
        this._resetCloudDepths();
        this.flowDirection = 1;
        this.manualMode = 'BASELINE';
        this.manualMaskStrength = null;

        const density = this.config.CLOUD_DENSITY ?? 0.98;
        const homeDensity = this.config.CLOUD_HOME_DENSITY ?? 1.0;
        const opacity = this.config.HOME_CLOUD_OPACITY ?? this.config.CLOUD_OPACITY ?? 0.96;
        const maskStrength = this.config.cloudCurve?.homeStrength ?? 0.94;

        const nearFactor = this.config.opacityMix?.homeNear ?? 0.32;
        const farFactor = this.config.opacityMix?.far ?? 1;

        this.nearAlpha = clamp01(maskStrength * density * homeDensity * opacity * nearFactor);
        this.farAlpha = clamp01(maskStrength * density * homeDensity * opacity * farFactor);
        this._applyOpacity();

        this.root.visible = true;
        this.state.mode = 'HOME_IDLE';
        this.state.phase = 'home';
        this.state.transitionStrength = 0;
        this.state.maskStrength = maskStrength;
        this.state.homeStrength = 1;
        this.state.maskActive = true;
        this.state.fogActive = true;
        this.state.fogFactor = 1;
        this.state.nearOpacity = this.nearAlpha;
        this.state.farOpacity = this.farAlpha;
        this.state.activeTransition = 'start';
        this.state.lowReadiness = false;
    }

    setBaseline() {
        this.manualMode = 'BASELINE';
        this.manualMaskStrength = null;
    }

    setMaskStrong() {
        this.manualMode = 'MASK_STRONG';
        this.manualMaskStrength = null;
    }

    fadeOut() {
        this.manualMode = 'FADE_OUT';
        this.manualMaskStrength = null;
    }

    setOff() {
        this.manualMode = 'OFF';
        this.manualMaskStrength = 0;
    }

    setAuto() {
        this.manualMode = 'AUTO';
        this.manualMaskStrength = null;
    }

    startTransition() {
        // Kept for compatibility with existing call sites.
    }

    shouldPrioritizeStreaming() {
        return this.state.phase === 'preload' || this.state.phase === 'load';
    }

    isOccluding() {
        return this.state.maskStrength > 0.08;
    }

    getOcclusionState() {
        return this.state;
    }

    update({
        deltaSeconds = 0.016,
        elapsedSeconds = 0,
        progress = 0,
        progressVelocity = 0,
        streamReadiness = 0
    } = {}) {
        if (!this.root) return this.state;

        const dt = Math.max(0.001, Math.min(0.05, deltaSeconds || 0.016));
        const vol = this.config.volume;
        const density = this.config.CLOUD_DENSITY ?? 0.98;
        const homeDensity = this.config.CLOUD_HOME_DENSITY ?? 1.0;
        const transitionDensity = this.config.CLOUD_TRANSITION_DENSITY ?? 0.9;
        const opacity = this.config.CLOUD_OPACITY ?? 0.96;
        const homeOpacity = this.config.HOME_CLOUD_OPACITY ?? opacity;
        const maskOpacity = this.config.MASK_CLOUD_OPACITY ?? opacity;

        this._syncToCamera();

        if (Math.abs(progressVelocity) > 0.00001) {
            this.flowDirection = progressVelocity >= 0 ? 1 : -1;
        }

        const autoMaskStrength = clamp01(computeCloudMaskStrength(progress, this.ranges, this.config.cloudCurve || {}));
        const autoPhaseInfo = computeCloudPhase(progress, this.ranges);
        let phaseInfo = autoPhaseInfo;
        let maskStrength = autoMaskStrength;
        let opacityTarget = opacity;
        let fadeLambda = phaseInfo.phase === 'load' ? 10 : 7;

        if (this.manualMode === 'BASELINE') {
            phaseInfo = { phase: 'home', mode: 'HOME_IDLE' };
            maskStrength = Math.max(maskStrength, this.config.cloudCurve?.homeStrength ?? 0.94);
            opacityTarget = homeOpacity;
        } else if (this.manualMode === 'MASK_STRONG') {
            phaseInfo = { phase: 'load', mode: 'TRANSITION_LOAD' };
            maskStrength = Math.max(maskStrength, 1);
            opacityTarget = maskOpacity;
            fadeLambda = 12;
        } else if (this.manualMode === 'FADE_OUT') {
            phaseInfo = { phase: 'reveal', mode: 'TRANSITION_EXIT' };
            maskStrength = Math.min(maskStrength, this.config.cloudCurve?.revealMinStrength ?? 0.2);
            opacityTarget = lerp(homeOpacity, opacity, 0.65);
            fadeLambda = 9;
        } else if (this.manualMode === 'OFF') {
            phaseInfo = { phase: 'idle', mode: 'SECTION_IDLE' };
            maskStrength = 0;
            opacityTarget = 0;
            fadeLambda = 14;
        }

        if (this.manualMaskStrength !== null && this.manualMaskStrength !== undefined) {
            maskStrength = this.manualMaskStrength;
        }
        maskStrength = clamp01(maskStrength);

        const transitionBlend = clamp01((progress - this.ranges.homeEnd) / Math.max(0.0001, this.ranges.transitionEnd - this.ranges.homeEnd));
        const homeStrength = clamp01(1 - transitionBlend);
        const transitionStrength = phaseInfo.mode === 'SECTION_IDLE' ? 0 : clamp01(1 - smoothstep(this.ranges.homeEnd, this.ranges.clearEnd, progress));

        const nearFactor = lerp(
            this.config.opacityMix?.homeNear ?? 0.32,
            this.config.opacityMix?.transitionNear ?? 0.58,
            transitionBlend
        );
        const farFactor = this.config.opacityMix?.far ?? 1;

        const densityBlend = lerp(homeDensity, transitionDensity, transitionBlend);
        const nearTarget = clamp01(maskStrength * density * densityBlend * opacityTarget * nearFactor);
        const farTarget = clamp01(maskStrength * density * densityBlend * opacityTarget * farFactor);

        const fadeDuration = Math.max(0.08, this.config.CLOUD_FADE_DURATION ?? 0.8);
        const damping = Math.max(4, fadeLambda / fadeDuration);
        this.nearAlpha = this.THREE.MathUtils.damp(this.nearAlpha, nearTarget, damping, dt);
        this.farAlpha = this.THREE.MathUtils.damp(this.farAlpha, farTarget, damping, dt);
        this._applyOpacity();

        const maskActive = maskStrength > 0.005;
        this.root.visible = maskActive;

        if (maskActive) {
            const offsets = this.config.depthOffset || {};
            const depthOffset = phaseInfo.mode === 'HOME_IDLE'
                ? (offsets.home ?? -620)
                : lerp(offsets.home ?? -620, offsets.transition ?? -220, transitionBlend);

            const nearWrap = vol.nearZ + vol.wrapPadding;
            const farWrap = vol.farZ - vol.wrapPadding;
            const motionBoost = clamp01(Math.abs(progressVelocity) * 2200);
            const flow = this.flowSpeed * (0.15 + maskStrength * 1.05 + transitionStrength * 0.35) * (1 + motionBoost * 1.1);

            for (let i = 0; i < this.clouds.length; i++) {
                const cloud = this.clouds[i];

                cloud.z += this.flowDirection * flow * cloud.flowJitter * dt;
                if (this.flowDirection >= 0 && cloud.z > nearWrap) {
                    cloud.z = farWrap - Math.random() * vol.wrapPadding;
                } else if (this.flowDirection < 0 && cloud.z < farWrap) {
                    cloud.z = nearWrap + Math.random() * vol.wrapPadding;
                }

                const lateralWave = Math.sin(elapsedSeconds * cloud.lateralSpeed + cloud.phase);
                const verticalWave = Math.sin(elapsedSeconds * cloud.verticalSpeed + cloud.phase * 1.37);
                const scaleWave = Math.sin(elapsedSeconds * cloud.scalePulseSpeed + cloud.phase * 0.82);
                const rollWave = Math.sin(elapsedSeconds * cloud.rollSpeed + cloud.phase);

                cloud.mesh.position.set(
                    cloud.baseX + (lateralWave * cloud.lateralAmp * cloud.driftDir),
                    cloud.baseY + (verticalWave * cloud.verticalAmp),
                    cloud.z + depthOffset
                );

                const scalePulse = cloud.isHorizon ? 0.032 : 0.05;
                const scale = cloud.baseScale * (1 + scaleWave * scalePulse);
                cloud.mesh.scale.set(scale * 1.56, scale, 1);
                cloud.mesh.rotation.z = cloud.baseRoll + rollWave * (cloud.isHorizon ? 0.04 : 0.07);
            }
        }

        const fogFactor = clamp01(maskStrength / Math.max(0.0001, this.config.cloudCurve?.homeStrength ?? 0.94));
        const revealReadinessThreshold = this.config.revealReadinessThreshold ?? 0.62;

        this.state.mode = phaseInfo.mode;
        this.state.phase = phaseInfo.phase;
        this.state.transitionStrength = transitionStrength;
        this.state.maskStrength = maskStrength;
        this.state.homeStrength = homeStrength;
        this.state.maskActive = maskActive;
        this.state.fogActive = maskActive;
        this.state.fogFactor = fogFactor;
        this.state.nearOpacity = this.nearAlpha;
        this.state.farOpacity = this.farAlpha;
        this.state.activeTransition = phaseInfo.mode === 'SECTION_IDLE' ? 'none' : 'start';
        this.state.lowReadiness = streamReadiness < revealReadinessThreshold;
        this.state.manualMode = this.manualMode;

        return this.state;
    }

    dispose() {
        if (this.scene && this.root) this.scene.remove(this.root);
        if (this.geometry) this.geometry.dispose();
        if (this.nearMaterial) this.nearMaterial.dispose();
        if (this.farMaterial) this.farMaterial.dispose();
        if (this.texture) this.texture.dispose();
        this.clouds.length = 0;
    }
}

export class WorldStreamingManager {
    constructor(config = WORLD_STREAMING_CONFIG) {
        this.config = config;
        this.activeZone = this.config.zones[0] || null;
        this.state = {
            zoneId: this.activeZone?.id || 'hero',
            phase: 'idle',
            preloadZoneId: this.activeZone?.id || 'hero',
            prioritizeStreaming: false,
            streamVisibilityGate: {
                enabled: false,
                strength: 0,
                distanceScale: this.activeZone?.distanceScale || 1,
                maxStage: this.activeZone?.maxStage || 3,
                treeProxyScale: this.activeZone?.treeProxyScale || 1,
                zone: this.activeZone?.id || 'hero',
                preloadMode: false,
                offscreenPreloadBoost: 1,
                offscreenMaxStage: 1
            }
        };
    }

    reset() {
        this.activeZone = this.config.zones[0] || null;
        this.state.zoneId = this.activeZone?.id || 'hero';
        this.state.preloadZoneId = this.activeZone?.id || 'hero';
        this.state.phase = 'idle';
        this.state.prioritizeStreaming = false;
        this.state.streamVisibilityGate.enabled = false;
        this.state.streamVisibilityGate.strength = 0;
        this.state.streamVisibilityGate.distanceScale = this.activeZone?.distanceScale || 1;
        this.state.streamVisibilityGate.maxStage = this.activeZone?.maxStage || 3;
        this.state.streamVisibilityGate.treeProxyScale = this.activeZone?.treeProxyScale || 1;
        this.state.streamVisibilityGate.zone = this.activeZone?.id || 'hero';
        this.state.streamVisibilityGate.preloadMode = false;
        this.state.streamVisibilityGate.offscreenPreloadBoost = 1;
        this.state.streamVisibilityGate.offscreenMaxStage = 1;
    }

    _resolveZone(progress) {
        const zones = this.config.zones || [];
        if (!zones.length) return null;

        const h = this.config.hysteresis || 0;
        if (this.activeZone && progress >= (this.activeZone.enter - h) && progress <= (this.activeZone.exit + h)) {
            return this.activeZone;
        }

        for (let i = 0; i < zones.length; i++) {
            const z = zones[i];
            if (progress >= z.enter && progress <= z.exit) return z;
        }

        if (progress < zones[0].enter) return zones[0];
        return zones[zones.length - 1];
    }

    _resolvePreloadZone(progress) {
        const zones = this.config.zones || [];
        if (!zones.length) return null;

        for (let i = zones.length - 1; i >= 0; i--) {
            const z = zones[i];
            if (progress >= (z.preloadStart ?? z.enter)) return z;
        }

        return zones[0];
    }

    update({ progress = 0, cloudState = null, streamReadiness = 0 } = {}) {
        const zone = this._resolveZone(progress);
        const preloadZone = this._resolvePreloadZone(progress) || zone;
        if (!zone) return this.state;

        this.activeZone = zone;

        const mode = cloudState?.mode || 'SECTION_IDLE';
        const phase = cloudState?.phase || 'idle';
        const maskStrength = cloudState?.maskStrength || 0;
        const gateCfg = this.config.streamGate || CLOUD_OCCLUSION_CONFIG.streamGate;

        let distanceScale = zone.distanceScale;
        let treeProxyScale = zone.treeProxyScale;
        let maxStage = zone.maxStage;

        const gateEnabled = mode !== 'SECTION_IDLE' && maskStrength > 0.01;
        const homeRefStrength = this.config.cloudCurve?.homeStrength ?? CLOUD_OCCLUSION_CONFIG.cloudCurve.homeStrength;
        const normalizedMask = clamp01(maskStrength / Math.max(0.0001, homeRefStrength));

        if (gateEnabled) {
            if (mode === 'HOME_IDLE') {
                distanceScale *= lerp(1, gateCfg.distanceScaleAtHome || 1, normalizedMask);
                treeProxyScale *= lerp(1, gateCfg.treeProxyScaleAtHome || 1, normalizedMask);
                maxStage = Math.min(maxStage, gateCfg.maxStageHome ?? maxStage);
            } else {
                distanceScale *= lerp(1, gateCfg.distanceScaleAtTransition || 1, normalizedMask);
                treeProxyScale *= lerp(1, gateCfg.treeProxyScaleAtTransition || 1, normalizedMask);
                maxStage = Math.min(maxStage, phase === 'load' ? (gateCfg.maxStageLoad ?? maxStage) : (gateCfg.maxStageTransition ?? maxStage));
            }
        }

        const ready = streamReadiness >= (this.config.readinessThreshold ?? 0.62);
        const preloadMode = gateEnabled && (phase === 'home' || phase === 'preload' || phase === 'load' || phase === 'reveal');
        const prioritizeStreaming = preloadMode && !ready;

        this.state.zoneId = zone.id;
        this.state.phase = phase;
        this.state.preloadZoneId = preloadZone.id;
        this.state.prioritizeStreaming = prioritizeStreaming;

        this.state.streamVisibilityGate.enabled = gateEnabled;
        this.state.streamVisibilityGate.strength = maskStrength;
        this.state.streamVisibilityGate.distanceScale = distanceScale;
        this.state.streamVisibilityGate.maxStage = maxStage;
        this.state.streamVisibilityGate.treeProxyScale = treeProxyScale;
        this.state.streamVisibilityGate.zone = zone.id;
        this.state.streamVisibilityGate.preloadMode = preloadMode;
        this.state.streamVisibilityGate.offscreenPreloadBoost = gateCfg.offscreenPreloadBoost || 1;
        this.state.streamVisibilityGate.offscreenMaxStage = gateCfg.offscreenMaxStage || 2;

        return this.state;
    }
}

export class CloudManager extends CloudTransitionManager {}
