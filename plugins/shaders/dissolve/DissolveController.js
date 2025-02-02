import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class DissolveController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
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

    resetFromJSON(o) {
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

    setProgress(value) {
        this.progress = value;
        return this;
    }

    setResizeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = ResizeMode[mode];
        }
        this.resizeMode = mode;
        return this;
    }

    setNoise(x, y, z) {
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

    setFromEdge(edgeStart, edgeWidth) {
        this.fromEdgeStart = edgeStart;
        this.fromEdgeWidth = edgeWidth;
        return this;
    }

    setToEdge(edgeStart, edgeWidth) {
        this.toEdgeStart = edgeStart;
        this.toEdgeWidth = edgeWidth;
    }

    setTransitionTargetTexture(key, frame, resizeMode) {
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