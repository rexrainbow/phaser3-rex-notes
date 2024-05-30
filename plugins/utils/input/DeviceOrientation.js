class DeviceOrientation {
    constructor() {
        this._alpha = 0;
        this._bete = 0;
        this._gamma = 0;

        var self = this;
        window.addEventListener('deviceorientation', function (event) {
            self._alpha = event.alpha || 0;
            self._beta = event.beta || 0;
            self._gamma = event.gamma || 0;
        }, false);
    }

    get alpha() {
        return this._alpha;
    }

    get bete() {
        return this._bete;
    }
    
    get gamma() {
        return this._gamma;
    }
}

export default DeviceOrientation;