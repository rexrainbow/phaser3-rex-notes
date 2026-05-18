import { FilterName } from './const';

import { Filters as PhaserFilters, Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

class DissolveController extends PhaserFilters.Controller {
    _progress: any;
    camera: any;
    fromEdgeStart: any;
    fromEdgeWidth: any;
    noiseX: any;
    noiseY: any;
    noiseZ: any;
    resizeMode: any;
    toEdgeStart: any;
    toEdgeWidth: any;
    toFrame: any;
    toRatio: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this._progress = 0;
        this.resizeMode = 1;
        this.noiseX = 0;
        this.noiseY = 0;
        this.noiseZ = 0;
        this.fromEdgeStart = 0.01;
        this.fromEdgeWidth = 0.05;
        this.toEdgeStart = 0.01;
        this.toEdgeWidth = 0.05;

        this.toFrame = null;
        this.toRatio = 1;

        this.resetFromJSON(config);
    }

    destroy() {
        this.toFrame = null;
        super.destroy();
    }

    resetFromJSON(o?: any) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
        this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
        this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
        this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
        return this;
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress = Clamp(value, 0, 1);
    }

    setProgress(value?: any) {
        this.progress = value;
        return this;
    }

    setResizeMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = ResizeMode[mode];
        }
        this.resizeMode = mode;
        return this;
    }

    setNoise(x?: any, y?: any, z?: any) {
        if (x === undefined) {
            x = 4 + Math.random() * 6;
        }
        if (y === undefined) {
            y = 4 + Math.random() * 6;
        }
        if (z === undefined) {
            z = Math.random() * 10;
        }
        this.noiseX = x;
        this.noiseY = y;
        this.noiseZ = z;
        return this;
    }

    setFromEdge(edgeStart?: any, edgeWidth?: any) {
        this.fromEdgeStart = edgeStart;
        this.fromEdgeWidth = edgeWidth;
        return this;
    }

    setToEdge(edgeStart?: any, edgeWidth?: any) {
        this.toEdgeStart = edgeStart;
        this.toEdgeWidth = edgeWidth;
    }

    setTransitionTargetTexture(key?: any, frame?: any, resizeMode?: any) {
        if (key === undefined) {
            key = '__DEFAULT';
        }
        var textures = this.camera.scene.sys.textures;
        var phaserTexture = textures.getFrame(key, frame);

        if (!phaserTexture) {
            phaserTexture = textures.getFrame('__DEFAULT');
        }

        this.toRatio = phaserTexture.width / phaserTexture.height;

        this.toFrame = phaserTexture;

        if (resizeMode !== undefined) {
            this.resizeMode = resizeMode;
        }

        return this;
    }
}

/**
 * Set the resize mode of the target texture.
 * 
 * Can be either:
 * 
 * 0 - Stretch. The target texture is stretched to the size of the source texture.
 * 1 - Contain. The target texture is resized to fit the source texture. This is the default.
 * 2 - Cover. The target texture is resized to cover the source texture.
 * 
 * If the source and target textures are the same size, then use a resize mode of zero
 * for speed.
 *
 */
const ResizeMode = {
    stretch: 0,
    contain: 1,
    cover: 2
}

export default DissolveController;