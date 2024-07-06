
import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';
import ZoomAt from '../../utils/camera/ZoomAt.js';

const Linear = Phaser.Math.Linear;

class EaseZoom extends EaseValueTaskBase {
    constructor(parent, config) {
        super(parent, config);
        // this.parent = mouseWheel;
        // this.timer

        this.resetFromJSON(config);
    }

    start(newZoomValue) {
        this.stop();

        this.startZoomValue = this.target.zoom;
        this.endZoomValue = newZoomValue;

        this.timer
            .setDuration(this.duration);

        super.start();
        return this;
    }

    updateTarget(camera, timer) {
        var wheelZoom = this.parent;
        var zoom = Linear(this.startZoomValue, this.endZoomValue, timer.t);
        ZoomAt(camera, zoom, wheelZoom.focusLocalX, wheelZoom.focusLocalY);
        // console.log(zoom)
    }
}

export default EaseZoom;