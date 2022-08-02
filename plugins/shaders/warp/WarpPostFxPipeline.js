import FragSrc from './warp-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const PI2 = Math.PI * 2;

class WarpPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexWarpPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.frequenceX = 10;
        this.frequenceY = 10;
        this.amplitudeX = 10;
        this.amplitudeY = 10;
        this.progress = 0;
        this.progressFactorX = 1;
        this.progressFactorY = 1;
    }

    resetFromJSON(o) {
        this.setFrequence(GetValue(o, 'frequenceX', 10), GetValue(o, 'frequenceY', 10));
        this.setAmplitude(GetValue(o, 'amplitudeX', 10), GetValue(o, 'amplitudeY', 10));        
        this.setProgress(GetValue(o, 'progress', 0));
        this.setProgressFactor(GetValue(o, 'progressFactorX', 1), GetValue(o, 'progressFactorY', 1));
        return this;
    }

    onPreRender() {
        this.set2f('frequence', this.frequenceX, this.frequenceY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        
        var progress = this.progress * PI2;
        var progressX = progress * this.progressFactorX;
        var progressY = progress * this.progressFactorY;
        this.set2f('progress', progressX, progressY);

        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // frequenceX
    setFrequenceX(value) {
        this.frequenceX = value;
        return this;
    }

    // frequenceY
    setFrequenceY(value) {
        this.frequenceY = value;
        return this;
    }

    setFrequence(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.frequenceX = x;
        this.frequenceY = y;
        return this;
    }

    // amplitudeX
    setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
    }

    // amplitudeY
    setAmplitudeY(value) {
        this.amplitudeY = value;
        return this;
    }

    setAmplitude(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.amplitudeX = x;
        this.amplitudeY = y;
        return this;
    }

    // progress
    setProgress(value) {
        this.progress = value;
        return this;
    }

    // progressFactorX
    setProgressFactorX(value) {
        this.progressFactorX = value;
        return this;
    }

    // progressFactorY
    setProgressFactorY(value) {
        this.progressFactorY = value;
        return this;
    }

    setProgressFactor(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.progressFactorX = x;
        this.progressFactorY = y;
        return this;
    }
}

export default WarpPostFxPipeline;