import EventEmitterMethods from '../eventemitter/EventEmitterMethods';
import GetValue from '../../../../phaser/src/utils/object/GetValue';

class DeviceOrientation {
    _alpha: any;
    _beta: any;
    _gamma: any;
    debug: any;
    destroyEventEmitter: any;
    emit: any;
    onUpdateAngles: any;
    setEventEmitter: any;

    constructor(scene?: any, config?: any) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this._alpha = 0;
        this._beta = 0;
        this._gamma = 0;

        this.debug = scene.add.text(0, 100, '??')

        var self = this;
        this.onUpdateAngles = (function(event?: any) {
            self.debug.text = 'deviceorientation';
            var alpha = event.alpha || 0;
            if (this._alpha !== alpha) {
                var prevAlpha = this._alpha;
                this._alpha = alpha;
                this.emit('alpha', alpha, prevAlpha);
            }

            var beta = event.beta || 0;
            if (this._beta !== beta) {
                var prevBeta = this._beta;
                this._beta = beta;
                this.emit('beta', beta, prevBeta);
            }

            var gamma = event.gamma || 0;
            if (this._gamma !== gamma) {
                var prevGamma = this._gamma;
                this._gamma = gamma;
                this.emit('gamma', gamma, prevGamma);
            }

            this.emit('change', alpha, beta, gamma);

        }).bind(this)
        //window.addEventListener('deviceorientation', this.onUpdateAngles, false);
    }

    shutdown(fromScene?: any) {
        window.removeEventListener('deviceorientation', this.onUpdateAngles, false);
        this.destroyEventEmitter();
    }

    destroy(fromScene?: any) {
        shutdown(fromScene);
    }

    get alpha() {
        return this._alpha;
    }

    get beta() {
        return this._beta;
    }

    get gamma() {
        return this._gamma;
    }

    requestPermission() {
        var self = this;
        self.debug.text = 'requestPermission';
        if (window.DeviceOrientationEvent && window.DeviceOrientationEvent.requestPermission) {
            return window.DeviceOrientationEvent.requestPermission()
                .then(function(result?: any) {
                    self.debug.text = `requestPermission -- ${result}`;
                    return Promise.resolve(result === 'granted');
                })
        } else {
            return Promise.resolve(true);
        }
    }
}

Object.assign(
    DeviceOrientation.prototype,
    EventEmitterMethods
);

export default DeviceOrientation;