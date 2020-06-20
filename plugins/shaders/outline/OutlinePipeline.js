import { GetFrag } from './outline-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class OutlinePipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        if (config === undefined) {
            config = {};
        }

        // Note: quality can't be changed during runtime
        var frag = GetFrag(config) // GLSL shader

        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._thickness = 0;
        this._outlineColor = new Color();

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0x000000));
        return this;
    }

    // thickness
    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        if (this._thickness === value) {
            return;
        }

        this._thickness = value;
        this.setFloat2('thickness', value, value);
    }

    setThickness(value) {
        this.thickness = value;
        return this;
    }

    // outlineColor
    get outlineColor() {
        return this._outlineColor;
    }

    set outlineColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        // value: {r, g, b}
        var color = this._outlineColor;
        color.setFromRGB(value);
        this.setFloat3('outlineColor', color.redGL, color.greenGL, color.blueGL);
    }

    setOutlineColor(value) {
        this.outlineColor = value;
        return this;
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

export default OutlinePipeline;