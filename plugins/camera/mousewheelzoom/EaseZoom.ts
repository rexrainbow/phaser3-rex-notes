
import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase';
import ZoomAt from '../../utils/camera/ZoomAt';

import { Math as PhaserMath } from 'phaser';
const Linear = PhaserMath.Linear;

class EaseZoom extends EaseValueTaskBase {
    duration: any;
    endZoomValue: any;
    parent: any;
    resetFromJSON: any;
    startZoomValue: any;
    stop: any;
    target: any;
    timer: any;

    constructor(parent?: any, config?: any) {
        super(parent, config);
        // this.parent = mouseWheel;
        // this.timer

        this.resetFromJSON(config);
    }

    start(newZoomValue?: any) {
        this.stop();

        this.startZoomValue = this.target.zoom;
        this.endZoomValue = newZoomValue;

        this.timer
            .setDuration(this.duration);

        super.start();
        return this;
    }

    updateTarget(camera?: any, timer?: any) {
        var wheelZoom = this.parent;
        var zoom = Linear(this.startZoomValue, this.endZoomValue, timer.t);
        ZoomAt(camera, zoom, wheelZoom.focusLocalX, wheelZoom.focusLocalY);
        // console.log(zoom)
    }
}

export default EaseZoom;