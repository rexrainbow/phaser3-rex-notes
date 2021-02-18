import GetFrag from './outline-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

var Quality = 0.1;
var FragSrc = GetFrag(Quality);
class OutlinePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexOutlinePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._thickness = 0;
        this._outlineColor = new Color();
    }

    resetFromJSON(o) {
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
        return this;
    }

    onPreRender() {
        this.set1f('thickness', this._thickness);
        if (this._thickness > 0) {
            this.set3f('outlineColor', this._outlineColor.redGL, this._outlineColor.greenGL, this._outlineColor.blueGL);
        }
        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        this._thickness = value;
    }

    setThickness(value) {
        this.thickness = value;
        return this;
    }

    get outlineColor() {
        return this._outlineColor;
    }

    set outlineColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._outlineColor.setFromRGB(value);
    }

    setOutlineColor(value) {
        this.outlineColor = value;
        return this;
    }

    static setQuality(quality) {
        Quality = quality;
        FragSrc = GetFrag(quality);
    }

    static getQuality() {
        return Quality;
    }
}

export default OutlinePostFxPipeline;