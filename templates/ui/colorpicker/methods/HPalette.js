import OverlapSizer from '../../overlapsizer/OverlapSizer.js';
import HPaletteCanvas from './HPaletteCanvas.js';

class HPalette extends OverlapSizer {
    constructor(scene, width, height) {
        super(scene, {
            width: width,
            height: height
        });

        var orientation = (width != null) ? 1 : 0;
        var hPaletteCanvas = (new HPaletteCanvas(scene))
            .setOrientation(orientation)
        scene.add.existing(hPaletteCanvas);

        hPaletteCanvas
            .setInteractive()
            .on('pointerdown', this.onPaletteCanvasPointerDown, this)
            .on('pointermove', this.onPaletteCanvasPointerDown, this)

        var marker = scene.add.rectangle(0, 0, 10, 10).setStrokeStyle(2, 0xffffff);

        this
            .add(
                hPaletteCanvas,
                { key: 'paletteCanvas', expand: true }
            )
            .add(
                marker,
                { key: 'marker', expand: false, align: 'center' }
            )
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);

        var size = Math.min(width, height);
        this.childrenMap.marker.setSize(size, size);

        return this;
    }

    onPaletteCanvasPointerDown(pointer, localX, localY, event) {
        if (!pointer.isDown) {
            return;
        }

        var hPaletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        if (hPaletteCanvas.orientation === 0) {
            marker.x = pointer.worldX;
        } else {
            marker.y = pointer.worldY;
        }
        this.resetChildPositionState(marker);

        var hue = hPaletteCanvas.getHue(localX, localY);
        this.emit('valuechange', hue);
    }

    setColor(color) {
        var hPaletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;

        hPaletteCanvas.setColor(color);

        var localXY = hPaletteCanvas.colorToLocalPosition(color, true);
        // LocalToWorld.call(hPaletteCanvas, localXY);
        // marker.setPosition(localXY.x, localXY.y);
        // this.resetChildPositionState(marker);

        return this;
    }
}

export default HPalette;