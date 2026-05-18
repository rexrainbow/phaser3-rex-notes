import { Utils as PhaserUtils, Math as PhaserMath } from 'phaser';
import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase';

const GetValue = PhaserUtils.Objects.GetValue;
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const Linear = PhaserMath.Linear;

class Fade extends EaseValueTaskBase {
    alphaEnd: any;
    alphaStart: any;
    boot: any;
    delay: any;
    duration: any;
    mode: any;
    parent: any;
    timer: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        super.resetFromJSON(o);

        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'start', this.parent.alpha),
            GetAdvancedValue(o, 'end', 0)
        );
        return this;
    }

    setMode(m?: any) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setAlphaRange(start?: any, end?: any) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration)
            .setRepeat((this.mode === 2) ? -1 : 0);

        super.start();
        return this;
    }

    updateTarget(gameObject?: any, timer?: any) {
        var t = timer.t;
        if (timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }

        gameObject.alpha = Linear(this.alphaStart, this.alphaEnd, t);
    }

    complete() {
        super.complete();
        if (this.mode === 1) {
            this.parent.destroy();
            // Will also destroy this behavior
        }
        return this;
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;