import FragSrc from './pixelation-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;


class PixelationPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexPixelationPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._pixelWidth = 4; // width of pixel wo resolution
        this._pixelHeight = 4; // height of pixel wo resolution
    }

    resetFromJSON(o) {
        this.setPixelSize(GetValue(o, 'pixelWidth', 4), GetValue(o, 'pixelHeight', 4));
        return this;
    }

    onPreRender() {
        this.set2f('pixelSize', this._pixelWidth, this._pixelHeight);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // pixelWidth
    get pixelWidth() {
        return this._pixelWidth;
    }

    set pixelWidth(value) {
        this._pixelWidth = value;
    }

    setPixelWidth(value) {
        this.pixelWidth = value;
        return this;
    }

    // pixelHeight
    get pixelHeight() {
        return this._pixelHeight;
    }

    set pixelHeight(value) {
        this._pixelHeight = value;
    }

    setPixelHeight(value) {
        this.pixelHeight = value;
        return this;
    }

    setPixelSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this._pixelWidth = width;
        this._pixelHeight = height;
        return this;
    }
}

export default PixelationPostFxPipeline;