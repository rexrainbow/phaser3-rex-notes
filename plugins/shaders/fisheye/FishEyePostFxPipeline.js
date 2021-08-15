import FragSrc from './fisheye-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class FishEyePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexFishEyePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
    }

    resetFromJSON(o) {
        this.radius = GetValue(o, 'radius', 0);
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        return this;
    }

    onPreRender() {
        this.set1f('radius', this.radius);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this.centerX, (textHeight - this.centerY));
        this.set2f('texSize', texWidth, textHeight);
    }

    // radius
    setRadius(value) {
        this.radius = value;
        return this;
    }

    // center
    setCenter(x, y) {
        if (x === undefined) {
            x = this.renderer.width / 2;
            y = this.renderer.height / 2;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
    }
}

export default FishEyePostFxPipeline;