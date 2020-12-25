import FragSrc from './outline-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class OutlinePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._thickness = 0;
        this._outlineColor = new Color();
        this._thickness1 = 0;
        this._outlineColor1 = new Color();
    }

    resetFromJSON(o) {
        this.setOutlineColor(
            GetValue(o, 'outlineColor', 0x000000),
            GetValue(o, 'thickness', 3)
        );
        this.setOutlineColor1(
            GetValue(o, 'outlineColor1', 0x000000),
            GetValue(o, 'thickness1', 0)
        );
        return this;
    }

    onPreRender() {
        this.set1f('thickness', this._thickness);
        if (this._thickness > 0) {
            this.set3f('outlineColor', this._outlineColor.redGL, this._outlineColor.greenGL, this._outlineColor.blueGL);
        }

        this.set1f('thickness1', this._thickness1);
        if (this._thickness1 > 0) {
            this.set3f('outlineColor1', this._outlineColor1.redGL, this._outlineColor1.greenGL, this._outlineColor1.blueGL);
        }

        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // Color0
    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        this._thickness = value;
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

    setThickness(value) {
        this.thickness = value;
        return this;
    }

    setOutlineColor(color, thickness) {
        this.outlineColor = color;

        if (thickness !== undefined) {
            this.thickness = thickness;
        }
        return this;
    }
    // Color0

    // Color1
    get thickness1() {
        return this._thickness1;
    }

    set thickness1(value) {
        this._thickness1 = value;
    }

    setThickness1(value) {
        this.thickness1 = value;
        return this;
    }

    // outlineColor
    get outlineColor1() {
        return this._outlineColor1;
    }

    set outlineColor1(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._outlineColor1.setFromRGB(value);
    }

    setOutlineColor1(color, thickness) {
        this.outlineColor1 = color;

        if (thickness !== undefined) {
            this.thickness1 = thickness;
        }
        return this;
    }
}

export default OutlinePostFxPipeline;