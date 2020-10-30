import { GetFrag } from './outline-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class OutlinePipeline extends MultiPipeline {
    constructor(scene, key, config) {
        if (config === undefined) {
            config = {};
        }

        // Note: quality can't be changed during runtime
        var game = scene.game;
        var frag = FragCodeReplacer(GetFrag(config), game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: 'Outline',
            uniforms: ['thickness', 'outlineColor', 'texSize']
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._thickness = 0;
        this._outlineColor = new Color();

        game.renderer.pipelines.add(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0x000000));
        return this;
    }

    bind() {
        super.bind();
        this.set2f('thickness', this._thickness, this._thickness);
        this.set3f('outlineColor', this._outlineColor.redGL, this._outlineColor.greenGL, this._outlineColor.blueGL);
        this.set2f('texSize', this._width, this._height);
    }

    // thickness
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

    // outlineColor
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

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        return this;
    }
}

export default OutlinePipeline;