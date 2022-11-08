import OverlapSizer from '../../overlapsizer/OverlapSizer.js';
import SVPaletteCanvas from './SVPaletteCanvas.js';

class SVPalette extends OverlapSizer {
    constructor(scene) {
        super(scene);

        var svPaletteCanvas = new SVPaletteCanvas(scene);
        scene.add.existing(svPaletteCanvas);

        svPaletteCanvas
            .setInteractive()
            .on('pointerdown', this.onPaletteCanvasPointerDown, this)
            .on('pointermove', this.onPaletteCanvasPointerDown, this)

        var marker = scene.add.circle(0, 0, 5).setStrokeStyle(2, 0xffffff);

        this
            .add(
                svPaletteCanvas,
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

        var marker = this.childrenMap.marker;
        marker.setPosition(pointer.worldX, pointer.worldY);
        this.resetChildPositionState(marker);
    }

    setHue(hue) {
        var svPaletteCanvas = this.childrenMap.paletteCanvas;
        svPaletteCanvas.setHue(hue);
        return this;
    }

    setColor(color) {
        var svPaletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        svPaletteCanvas.setColor(color);

        var localXY = svPaletteCanvas.colorToLocalPosition(color, true);
        // LocalToWorld.call(svPaletteCanvas, localXY);
        // marker.setPosition(localXY.x, localXY.y);
        // this.resetChildPositionState(marker);

        return this;
    }
}

export default SVPalette;