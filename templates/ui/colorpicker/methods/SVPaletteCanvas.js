import Canvas from '../../canvas/Canvas.js';
import { DrawSVPalette } from '../../../../plugins/utils/canvas/DrawHSVPalette.js';

const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;

class SVPaletteCanvas extends Canvas {
    constructor(scene, x, y, width, height, hue) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = 2; }

        super(scene, x, y, width, height);
        this.type = 'rexSVPaletteCanvas';

        if (hue === undefined) {
            hue = 1;
        }

        this.color = new Color();

        this.setHue(hue);
        this.setSize(width, height);
    }

    get hue() {
        return this._hue;
    }

    set hue(hue) {
        if (this._hue === hue) {
            return;
        }
        this._hue = hue;
        this.dirty = true;
    }

    setHue(hue) {
        this.hue = hue;
        return this;
    }

    updateTexture() {
        DrawSVPalette(this.canvas, this.context, this.hue);
        super.updateTexture();
        return this;
    }

    setColor(color) {
        this.color.setFromRGB(ColorToRGBA(color));
        this.setHue(this.color.h);
        return this;
    }

    colorToLocalPosition(color, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (LocalXY === undefined) {
                LocalXY = {};
            }
            out = LocalXY;
        }

        this.color.setFromRGB(ColorToRGBA(color));
        out.x = this.width * this.color.s;
        out.y = this.height * (1 - this.color.v);

        return out;
    }
}

var LocalXY = undefined;

export default SVPaletteCanvas;