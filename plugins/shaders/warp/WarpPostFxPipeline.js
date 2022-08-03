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

        this.pixelWidth = 10;
        this.pixelHeight = 10;
        this.radiusX = 10;
        this.radiusY = 10;
        this.progressX = 0;
        this.progressY = 0;
    }

    resetFromJSON(o) {
        var pixelSize = GetValue(o, 'pixelSize', 10);
        this.setPixelSize(GetValue(o, 'pixelWidth', pixelSize), GetValue(o, 'pixelHeight', pixelSize));

        var radius = GetValue(o, 'radius', 10);
        this.setRadius(GetValue(o, 'radiusX', radius), GetValue(o, 'radiusY', radius));

        var progress = GetValue(o, 'progress', 0);
        this.setProgress(GetValue(o, 'progressX', progress), GetValue(o, 'progressY', progress));
        return this;
    }

    onPreRender() {
        this.set2f('pixelSize', this.pixelWidth, this.pixelHeight);
        this.set2f('radius', this.radiusX, this.radiusY);
        this.set2f('progress', this.progressX * PI2, this.progressY * PI2);
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

    get pixelSize() {
        return (this.pixelWidth + this.pixelHeight) / 2;
    }

    set pixelSize(value) {
        this.pixelWidth = value;
        this.pixelHeight = value;
    }

    // radiusX
    setRadiusX(value) {
        this.radiusX = value;
        return this;
    }

    // radiusY
    setRadiusY(value) {
        this.radiusY = value;
        return this;
    }

    setRadius(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.radiusX = x;
        this.radiusY = y;
        return this;
    }

    get radius() {
        return (this.radiusX + this.radiusY) / 2;
    }

    set radius(value) {
        this.radiusX = value;
        this.radiusY = value;
    }

    // progress
    setProgressX(value) {
        this.progressX = value;
        return this;
    }
    setProgressY(value) {
        this.progressY = value;
        return this;
    }

    setProgress(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.progressX = x;
        this.progressY = y;
        return this;
    }

    get progress() {
        return (this.progressX + this.progressY) / 2;
    }

    set progress(value) {
        this.progressX = value;
        this.progressY = value;
    }
}

export default WarpPostFxPipeline;