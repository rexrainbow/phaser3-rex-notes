import OverlapSizer from '../../overlapsizer/OverlapSizer.js';
import SVPaletteCanvas from './SVPaletteCanvas.js';
import RoundRectangle from '../../roundrectangle/RoundRectangle.js';
import { LocalToWorld } from './Transform.js';

class SVPalette extends OverlapSizer {
    constructor(scene, width, height) {
        super(scene, {
            width: width,
            height: height
        });

        var paletteCanvas = new SVPaletteCanvas(scene);
        scene.add.existing(paletteCanvas);

        paletteCanvas
            .setInteractive()
            .on('pointerdown', this.onPaletteCanvasPointerDown, this)
            .on('pointermove', this.onPaletteCanvasPointerDown, this)

        var marker = new RoundRectangle(scene, { radius: 5, strokeColor: 0xffffff, strokeWidth: 2 });
        scene.add.existing(marker);

        this
            .add(
                paletteCanvas,
                { key: 'paletteCanvas', expand: true }
            )
            .add(
                marker,
                { key: 'marker', expand: false, align: 'center' }
            )
    }

    onPaletteCanvasPointerDown(pointer, localX, localY, event) {
        if (!pointer.isDown) {
            return;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        marker.setPosition(pointer.worldX, pointer.worldY);
        this.resetChildPositionState(marker);

        var color = paletteCanvas.getColor(localX, localY);
        this.emit('input', color);
    }

    setHue(hue) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setHue(hue);
        return this;
    }

    setColor(color) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        paletteCanvas.setColor(color);

        var localXY = paletteCanvas.colorToLocalPosition(color, true);
        LocalToWorld(paletteCanvas, localXY.x, localXY.y, marker);
        this.resetChildPositionState(marker);

        return this;
    }

    getColor(localX, localY) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        return paletteCanvas.getColor(localX, localY);
    }
}

export default SVPalette;