import CursorKeys from '../../utils/input/CursorKeys.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import TiltAngle from '../../utils/input/TiltAngle.js';
import DIRMODE from '../../utils/math/angle/angletodirections/Const.js';


class TiltCursor extends CursorKeys {
    constructor(scene, config) {
        super(scene);

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.tiltAngle = new TiltAngle();
        this.resetFromJSON(config);
        this.boot();
    }

    boot() {
        this.tiltAngle.on('change', this.onTiltChange, this);
    }

    shutdown(fromScene) {
        this.tiltAngle.off('change', this.onTiltChange, this);

        this.tiltAngle.destroy();

        this.destroyEventEmitter();

        super.shutdown(fromScene);
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setAngleThreshold(GetValue(o, 'forceMin', 16));

        this.tiltAngle
            .setCalibrationMode(GetValue(o, 'calibrationMode', 0))
            .calibration()
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.clearAllKeysState();
        }
        this._enable = e;
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setAngleThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.forceMin = d;
        return this;
    }

    onTiltChange() {

    }

}

Object.assign(
    TiltCursor.prototype,
    EventEmitterMethods
);

export default TiltCursor;