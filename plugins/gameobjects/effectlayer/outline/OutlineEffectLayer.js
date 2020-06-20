import EffectLayer from '../EffectLayer.js';
import { GetFrag } from './outline-frag.js';

const BaseShader = Phaser.Display.BaseShader;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class OutlineEffectLayer extends EffectLayer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Note: quality can't be changed during runtime
        var frag = GetFrag(config) // GLSL shader
        var uniforms = {
            thickness: { type: '2f', value: { x: 0, y: 0 } },
            outlineColor: { type: '3f', value: { x: 0, y: 0, z: 0 } }
        }
        var baseShader = new BaseShader('Outline', frag, undefined, uniforms);
        super(scene, baseShader, config);
        this.type = 'rexOutlineEffectLayer';

        this._thickness = 0;
        this._outlineColor = new Color();

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
        this.setUniformXY('thickness', value, value);
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
        this.setUniformXYZ('outlineColor', color.redGL, color.greenGL, color.blueGL);
    }

    setOutlineColor(value) {
        this.outlineColor = value;
        return this;
    }
}

export default OutlineEffectLayer;