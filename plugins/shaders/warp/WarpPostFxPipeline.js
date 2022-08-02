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

        this.pixelWidth = 20;  // width of pixel wo resolution
        this.pixelHeight = 20; // height of pixel wo resolution
        this.amplitudeX = 10;
        this.amplitudeY = 10;
        this.frequenceX = 1;
        this.frequenceY = 1;
        this.progress = 0;
        this.progressFactorX = 1;
        this.progressFactorY = 1;
    }

    resetFromJSON(o) {
        this.setPixelSize(GetValue(o, 'pixelWidth', 20), GetValue(o, 'pixelHeight', 20));
        this.setAmplitude(GetValue(o, 'amplitudeX', 10), GetValue(o, 'amplitudeY', 10));
        this.setFrequence(GetValue(o, 'frequenceX', 1), GetValue(o, 'frequenceY', 1));
        this.setProgress(GetValue(o, 'progress', 0));
        this.setProgressFactor(GetValue(o, 'progressFactorX', 1), GetValue(o, 'progressFactorY', 1));
        return this;
    }

    onPreRender() {
        this.set2f('pixelSize', this.pixelWidth, this.pixelHeight);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        this.set2f('frequence', this.frequenceX, this.frequenceY);

        var progress = this.progress * PI2;
        var progressX = progress * this.progressFactorX;
        var progressY = progress * this.progressFactorY;
        this.set2f('progress', progressX, progressY);

        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // pixelWidth
    setPixelWidth(value) {
        this.pixelWidth = value;
        return this;
    }

    // pixelHeight
    setPixelHeight(value) {
        this.pixelHeight = value;
        return this;
    }

    setPixelSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.pixelWidth = width;
        this.pixelHeight = height;
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