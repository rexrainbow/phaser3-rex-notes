import CursorKeys from '../../utils/input/CursorKeys';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods';
import TiltAngle from '../../utils/input/TiltAngle';
import DIRMODE from '../../utils/math/angle/angletodirections/Const';


class TiltCursor extends CursorKeys {
    _enable: any;
    clearAllKeysState: any;
    destroyEventEmitter: any;
    dirMode: any;
    forceMin: any;
    setEventEmitter: any;
    tiltAngle: any;

    constructor(scene?: any, config?: any) {
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

    shutdown(fromScene?: any) {
        this.tiltAngle.off('change', this.onTiltChange, this);

        this.tiltAngle.destroy();

        this.destroyEventEmitter();

        super.shutdown(fromScene);
    }

    resetFromJSON(o?: any) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setAngleThreshold(GetValue(o, 'forceMin', 16));

        this.tiltAngle
            .setCalibrationMode(GetValue(o, 'calibrationMode', 0))
            .calibration()
    }

    setMode(m?: any) {
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

    setEnable(e?: any) {
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

    setAngleThreshold(d?: any) {
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