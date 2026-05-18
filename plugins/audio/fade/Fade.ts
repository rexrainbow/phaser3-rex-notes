import { Utils as PhaserUtils, Math as PhaserMath } from 'phaser';
import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase';
import IsSoundObject from '../../utils/system/IsSoundObject';

const GetValue = PhaserUtils.Objects.GetValue;
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const Linear = PhaserMath.Linear;

class Fade extends EaseValueTaskBase {
    delay: any;
    duration: any;
    mode: any;
    parent: any;
    setEnable: any;
    timer: any;
    volume: any;

    constructor(scene?: any, sound?: any, config?: any) {
        if (IsSoundObject(scene)) {
            config = sound;
            sound = scene;
            scene = undefined;
        }

        sound.active = true;
        sound.scene = scene;
        sound.game = sound.manager.game;

        super(sound, config);
        // this.parent = parent
        // this.timer

        this.volume = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        super.resetFromJSON(o);
        this.setMode(GetValue(o, 'mode', 0));
        this.setEnable(GetValue(o, 'enable', true));
        this.setVolumeRange(
            GetAdvancedValue(o, 'volume.start', this.parent.volume),
            GetAdvancedValue(o, 'volume.end', 0)
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

    setVolumeRange(start?: any, end?: any) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        this.parent.setVolume(this.volume.start);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        super.start();
        return this;
    }

    updateTarget(parent?: any, timer?: any) {
        parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
    }

    complete() {
        super.complete();

        switch (this.mode) {
            case 1:
                this.parent.stop();
                break;
            case 2:
                this.parent.stop();
                this.parent.destroy();
                break;
        }

        return this;
    }
}

const MODE = {
    stop: 1,
    destroy: 2
}

export default Fade;