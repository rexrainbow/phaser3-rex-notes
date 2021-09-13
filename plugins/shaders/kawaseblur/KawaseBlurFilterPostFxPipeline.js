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

        this._kernels = [0];
        this._blur = 0;
        this._quality = 1;
        this.pixelWidth = 1; // width of pixel wo resolution
        this.pixelHeight = 1; // height of pixel wo resolution
    }

    resetFromJSON(o) {
        var kernels = GetValue(o, 'kernels', undefined);
        if (kernels) {
            this.setKernela(kernels);
        } else {
            this.setBlur(GetValue(o, 'blur', 4));
            this.setQuality(GetValue(o, 'quality', 3))
        }

        this.setPixelSize(GetValue(o, 'pixelWidth', 1), GetValue(o, 'pixelHeight', 1));
        return this;
    }

    onPreRender() {
    }

    onDraw(renderTarget) {
        var target1 = this.fullFrame1,
            target2 = this.fullFrame2,
            lastTarget;

        this.copyFrame(renderTarget, target1);
        lastTarget = target1;

        var uvX = this.pixelWidth / this.renderer.width;
        var uvY = this.pixelHeight / this.renderer.height;
        var offset, uOffsetX, uOffsetY;
        for (var i = 0; i < this._quality; i++) {
            offset = this._kernels[i] + 0.5;
            uOffsetX = offset * uvX;
            uOffsetY = offset * uvY;
            this.set2f('uOffset', uOffsetX, uOffsetY);          

            if ((i % 2) === 0) {  // 0,2,4,...
                this.bindAndDraw(target1, target2);
                lastTarget = target2;
            } else {  // 1,3,5,...
                this.bindAndDraw(target2, target1);
                lastTarget = target1;
            }

        }

        this.bindAndDraw(lastTarget);
    }

    // blur
    get blur() {
        return this._blur;
    }

    set blur(value) {
        if (this._blur !== value) {
            GenerateKernels(value, this._quality, this._kernels);
        }
        this._blur = value;
    }

    setBlur(value) {
        this.blur = value;
        return this;
    }

    // quality
    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this._quality !== value) {
            GenerateKernels(this._blur, value, this._kernels);
        }
        this._quality = value;
    }

    setQuality(value) {
        this.quality = value;
        return this;
    }

    // kernels
    get kernels() {
        return this._kernels;
    }

    set kernels(value) {
        if (value === undefined) {
            value = [0];
        }

        this._kernels = value;
        this._quality = value.length;
        this._blur = Math.max(...value);
    }

    setKernela(value) {
        this.kernels = value;
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

var GenerateKernels = function (blur, quality, out) {
    if (out === undefined) {
        out = [];
    } else {
        out.length = 0;
    }
    for (var i = quality; i > 0; i--) {
        out.push(blur * (i / quality));
    }
    return out;
}

export default KawaseBlurFilterPostFxPipeline;