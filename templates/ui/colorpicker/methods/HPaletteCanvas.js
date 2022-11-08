import Canvas from '../../canvas/Canvas.js';
import GetOrientationMode from '../../utils/GetOrientationMode.js';
import { DrawHPalette } from '../../../../plugins/utils/canvas/DrawHSVPalette.js';

const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;

class HPaletteCanvas extends Canvas {
    constructor(scene, x, y, width, height, orientation) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = 2; }

        super(scene, x, y, width, height);
        this.type = 'rexHPaletteCanvas';

        this.color = new Color();

        this.setOrientation(orientation);
        this.setSize(width, height);
    }

    setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
    }

    updateTexture() {
        DrawHPalette(this.canvas, this.context, this.orientation);
        super.updateTexture();
        return this;
    }

    getHue(localX, localY) {
        if (this.orientation === 0) {
            var h = Percent(localX, 0, this.width);
        } else {
            var h = Percent(localY, 0, this.height);
        }

        return h;
    }

    setColor(color) {
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

        if (this.orientation === 0) {
            out.x = this.width * this.color.h;
            out.y = this.height / 2;
        } else {
            out.x = this.width / 2;
            out.y = this.height * this.color.h;
        }

        return out;
    }
}

var LocalXY = undefined;

export default HPaletteCanvas;