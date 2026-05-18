import Canvas from '../../../canvas/Canvas';
import { DrawSVPalette } from '../../../../../plugins/utils/canvas/DrawHSVPalette';

import { Display as PhaserDisplay, Math as PhaserMath } from 'phaser';
const Color = PhaserDisplay.Color;
const Percent = PhaserMath.Percent;
const ColorToRGBA = PhaserDisplay.Color.ColorToRGBA;
const HSVToRGB = PhaserDisplay.Color.HSVToRGB;

class SVPaletteCanvas extends Canvas {
    _hue: any;
    canvas: any;
    colorObject: any;
    context: any;
    dirty: any;
    height: any;
    setSize: any;
    type: any;
    width: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, hue?: any) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = 2; }

        super(scene, x, y, width, height);
        this.type = 'rexColorPicker.SVPaletteCanvas';

        if (hue === undefined) {
            hue = 1;
        }

        this.colorObject = new Color();

        this.setHue(hue);
        this.setSize(width, height);
    }

    get color() {
        return this.colorObject.color;
    }

    get hue() {
        return this._hue;
    }

    set hue(hue) {
        if (this._hue === hue) {
            return;
        }
        this._hue = hue;
        this.colorObject.h = hue;
        this.dirty = true;
    }

    setHue(hue?: any) {
        this.hue = hue;
        return this;
    }

    updateTexture() {
        DrawSVPalette(this.canvas, this.context, this.hue);
        super.updateTexture();
        return this;
    }

    getColor(localX?: any, localY?: any) {
        if (localX === undefined) {
            return this.colorObject.color;
        }

        var s = Percent(localX, 0, this.width);
        var v = 1 - Percent(localY, 0, this.height);
        this.colorObject.setFromRGB(HSVToRGB(this.hue, s, v));
        return this.colorObject.color;
    }

    setColor(color?: any) {
        if (this.color === color) {
            return this;
        }

        this.colorObject.setFromRGB(ColorToRGBA(color));
        this.setHue(this.colorObject.h);
        return this;
    }

    colorToLocalPosition(color?: any, out?: any) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (LocalXY === undefined) {
                LocalXY = {};
            }
            out = LocalXY;
        }

        this.colorObject.setFromRGB(ColorToRGBA(color));
        out.x = this.width * this.colorObject.s;
        out.y = this.height * (1 - this.colorObject.v);

        return out;
    }
}

var LocalXY = undefined;

export default SVPaletteCanvas;