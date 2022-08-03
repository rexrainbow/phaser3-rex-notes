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
        this.progress = 0;
        this.progressFactorX = 1;
        this.progressFactorY = 1;
    }

    resetFromJSON(o) {
        this.setPixelSize(GetValue(o, 'pixelWidth', 10), GetValue(o, 'pixelHeight', 10));
        this.setRadius(GetValue(o, 'radiusX', 10), GetValue(o, 'radiusY', 10));        
        this.setProgress(GetValue(o, 'progress', 0));
        this.setProgressFactor(GetValue(o, 'progressFactorX', 1), GetValue(o, 'progressFactorY', 1));
        return this;
    }

    onPreRender() {
        this.set2f('pixelSize', this.pixelWidth, this.pixelHeight);
        this.set2f('radius', this.radiusX, this.radiusY);
        
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