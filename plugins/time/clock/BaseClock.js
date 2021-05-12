import TickTask from '../../utils/ticktask/TickTask.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';
import GetEventEmitter from '../../utils/system/GetEventEmitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BaseClock extends TickTask {
    constructor(parent, config) {
        super(parent, config);

        this.parent = parent;
        this.scene = GetSceneObject(parent);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.now = GetValue(o, 'now', 0);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            timeScale: this.timeScale,
            now: this.now,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();

        var parentEE = GetEventEmitter(this.parent);
        if (parentEE) {
            parentEE.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.parent = undefined;
        this.scene = undefined;
    }

    // Override
    // startTicking() { }

    // Override
    // stopTicking() {}

    start(startAt) {
        if (startAt === undefined) {
            startAt = 0;
        }
        this.delta = 0;
        this.now = startAt;
        super.start();
        return this;
    }

    seek(time) {
        this.now = time;
        return this;
    }

    setTimeScale(value) {
        this.timeScale = value;
        return this;
    }

    tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
    }
}

export default BaseClock;