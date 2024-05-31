import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';

class DeviceOrientation {
    constructor(scene, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this._alpha = 0;
        this._beta = 0;
        this._gamma = 0;

        var self = this;
        window.addEventListener('deviceorientation', function (event) {
            var alpha = event.alpha || 0;
            if (self._alpha !== alpha) {
                var prevAlpha = self._alpha;
                self._alpha = alpha;
                self.emit('alpha', alpha, prevAlpha);
            }

            var beta = event.beta || 0;
            if (self._beta !== beta) {
                var prevBeta = self._beta;
                self._beta = beta;
                self.emit('beta', beta, prevBeta);
            }

            var gamma = event.gamma || 0;
            if (self._gamma !== gamma) {
                var prevGamma = self._gamma;
                self._gamma = gamma;
                self.emit('gamma', gamma, prevGamma);
            }

            self.emit('change', alpha, beta, gamma);

        }, false);
    }

    shutdown(fromScene) {
        this.destroyEventEmitter();
    }

    destroy(fromScene) {
        shutdown(fromScene);
    }

    get alpha() {
        return this._alpha;
    }

    get _beta() {
        return this._beta;
    }

    get gamma() {
        return this._gamma;
    }
}

Object.assign(
    DeviceOrientation.prototype,
    EventEmitterMethods
);

export default DeviceOrientation;