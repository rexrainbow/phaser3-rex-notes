import FragSrc from './kawaseblurFilter-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class KawaseBlurFilterPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexKawaseBlurFilterPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.blur = 1;
        this.pixelWidth = 1; // width of pixel wo resolution
        this.pixelHeight = 1; // height of pixel wo resolution
    }

    resetFromJSON(o) {
        this.setBlur(GetValue(o, 'blur', 1));
        this.setPixelSize(GetValue(o, 'pixelWidth', 1), GetValue(o, 'pixelHeight', 1));
        return this;
    }

    onPreRender() {
        var uvX = this.pixelWidth / this.renderer.width;
        var uvY = this.pixelHeight / this.renderer.height;
        var offset = this.blur + 0.5,
            uOffsetX = offset * uvX,
            uOffsetY = offset * uvY;
        this.set2f('uOffset', uOffsetX, uOffsetY);
    }

    // blur
    setBlur(value) {
        this.blur = value;
        return this;
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
}

export default KawaseBlurFilterPostFxPipeline;