import frag from './pixelation-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class PixelationPipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._pixelWidth = 0; // width of pixel wo resolution
        this._pixelHeight = 0; // height of pixel wo resolution
       
        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setPixelSize(GetValue(o, 'pixelWidth', 0), GetValue(o, 'pixelHeight', 0));
        return this;
    }

    // pixelWidth
    get pixelWidth() {
        return this._pixelWidth;
    }

    set pixelWidth(value) {
        this._pixelWidth = value;
        this._setPixelSize();
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
        this._setPixelSize();
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
        this._setPixelSize();
        return this;
    }

    _setPixelSize() {
        this.setFloat2('pixelSize', this._pixelWidth, this._pixelHeight);
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.setFloat2('texSize', width, height);
        return this;
    }
}

export default PixelationPipeline;