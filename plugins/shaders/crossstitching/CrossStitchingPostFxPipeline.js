import FragSrc from './crossstitching-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class CrossStitchingPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexCrossStitchingPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._stitchingWidth = 6; // width of stitching wo resolution
        this._stitchingHeight = 6; // height of stitching wo resolution
        this._brightness = 0;
    }

    resetFromJSON(o) {
        this.setStitchingSize(GetValue(o, 'stitchingWidth', 6), GetValue(o, 'stitchingHeight', 6));
        this.setBrightness(GetValue(o, 'brightness', 0));
        return this;
    }

    onPreRender() {
        this.set2f('stitchingSize', this._stitchingWidth, this._stitchingHeight);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
        this.set1f('brightness', this._brightness);
    }

    // stitchingWidth
    get stitchingWidth() {
        return this._stitchingWidth;
    }

    set stitchingWidth(value) {
        this._stitchingWidth = value;
    }

    setStitchingWidth(value) {
        this.stitchingWidth = value;
        return this;
    }

    // stitchingHeight
    get stitchingHeight() {
        return this._stitchingHeight;
    }

    set stitchingHeight(value) {
        this._stitchingHeight = value;
    }

    setStitchingHeight(value) {
        this.stitchingHeight = value;
        return this;
    }

    setStitchingSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this._stitchingWidth = width;
        this._stitchingHeight = height;
        return this;
    }

    // brightness
    get brightness() {
        return this._brightness;
    }

    set brightness(value) {
        this._brightness = Clamp(value, 0, 1);
    }

    setBrightness(value) {
        this.brightness = value;
        return this;
    }
}

export default CrossStitchingPostFxPipeline;