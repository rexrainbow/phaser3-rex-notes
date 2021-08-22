import FragSrc from './noisedelayfade-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class NoiseDelayFadePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexNoiseDelayFadePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        // Progress
        this._progress = 0;
        this._activeRate = 0.5;
        // Noise
        this.noiseX = 0;
        this.noiseY = 0;
        this.noiseZ = 0;
        // Alpha
        this.alpha0 = 1;
        this.alpha1 = 0;
    }

    resetFromJSON(o) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setActiveRate(GetValue(o, 'activeRate', 0.5));
        this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
        this.setFadeMode(GetValue(o, 'mode', 0));
        return this;
    }

    onPreRender() {
        this.set1f('progress', this.progress);
        this.set1f('activeRate', this.activeRate);

        this.set1f('noiseX', this.noiseX);
        this.set1f('noiseY', this.noiseY);
        this.set1f('noiseZ', this.noiseZ);

        this.set1f('alpha0', this.alpha0);
        this.set1f('alpha1', this.alpha1);
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

    get activeRate() {
        return this._activeRate;
    }

    set activeRate(value) {
        this._activeRate = Clamp(value, 0, 1);
    }

    setActiveRate(value) {
        this.activeRate = value;
        return this;
    }

    setNoise(x, y, z) {
        if (x === undefined) {
            x = 4 + Math.random() * 30;
        }
        if (y === undefined) {
            y = 4 + Math.random() * 30;
        }
        if (z === undefined) {
            z = Math.random() * 10;
        }
        this.noiseX = x;
        this.noiseY = y;
        this.noiseZ = z;
        return this;
    }

    setFadeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = FadeMode[mode];
        }
        if (mode === 0) {
            this.alpha0 = 1;
            this.alpha1 = 0;
        } else {
            this.alpha0 = 0;
            this.alpha1 = 1;
        }
        return this;
    }

}

const FadeMode = {
    fadeOut: 0,
    fadeIn: 1
}

export default NoiseDelayFadePostFxPipeline;