import OverlapSizer from '../../../overlapsizer/OverlapSizer';
import SVPaletteCanvas from './SVPaletteCanvas';
import RoundRectangle from '../../../roundrectangle/RoundRectangle';
import { LocalToWorld } from './Transform';

class SVPalette extends OverlapSizer {
    childrenMap: any;
    emit: any;
    resetChildPositionState: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);

        var paletteCanvas = new SVPaletteCanvas(scene);
        scene.add.existing(paletteCanvas);
        this.type = 'rexColorPicker.SVPalette';

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
                { key: 'marker', expand: false }
            )
    }

    onPaletteCanvasPointerDown(pointer?: any, localX?: any, localY?: any, event?: any) {
        if (!pointer.isDown) {
            return;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        var color = paletteCanvas.getColor(localX, localY);
        this.setMarkerPosition(color);

        this.emit('input', color);
    }

    get color() {
        return this.childrenMap.paletteCanvas.color;
    }

    setHue(hue?: any) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setHue(hue);  // Redraw paletteCanvas
        // Position of marker does not change
        return this;
    }

    setColor(color?: any) {
        if (this.color === color) {
            return this;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setColor(color);  // Redraw paletteCanvas
        this.setMarkerPosition(color);
        return this;
    }

    setMarkerPosition(color?: any) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        var localXY = paletteCanvas.colorToLocalPosition(color, true);
        LocalToWorld(paletteCanvas, localXY.x, localXY.y, marker);
        this.resetChildPositionState(marker);

        return this;
    }
}

export default SVPalette;