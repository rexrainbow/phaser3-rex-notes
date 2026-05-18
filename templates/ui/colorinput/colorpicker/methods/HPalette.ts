import OverlapSizer from '../../../overlapsizer/OverlapSizer';
import HPaletteCanvas from './HPaletteCanvas';
import RoundRectangle from '../../../roundrectangle/RoundRectangle';
import { LocalToWorld } from './Transform';

class HPalette extends OverlapSizer {
    childrenMap: any;
    emit: any;
    height: any;
    resetChildPositionState: any;
    type: any;
    width: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        super(scene, config);

        var orientation = (config.width != null) ? 1 : 0;
        var paletteCanvas = (new HPaletteCanvas(scene))
            .setOrientation(orientation)
        scene.add.existing(paletteCanvas);
        this.type = 'rexColorPicker.HPalette';

        paletteCanvas
            .setInteractive()
            .on('pointerdown', this.onPaletteCanvasPointerDown, this)
            .on('pointermove', this.onPaletteCanvasPointerDown, this)

        var marker = new RoundRectangle(scene, { strokeColor: 0xffffff, strokeWidth: 2 });
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

    resize(width?: any, height?: any) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);

        var size = Math.min(width, height);
        this.childrenMap.marker.setSize(size, size);

        return this;
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

    setColor(color?: any) {
        if (this.color === color) {
            return this;
        }

        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setColor(color);
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

    getHue(localX?: any, localY?: any) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        return paletteCanvas.getHue(localX, localY);
    }
}

export default HPalette;