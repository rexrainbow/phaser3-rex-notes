import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddTiltShiftProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'tiltShiftRadius')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var tiltShiftRadius,
        tiltShiftAmount = 1,
        tiltShiftContrast = 0.2,
        tiltShiftBlurX = 1,
        tiltShiftBlurY = 1,
        tiltShiftStrength = 1;
    Object.defineProperty(gameObject, 'tiltShiftRadius', {
        get: function () {
            return tiltShiftRadius;
        },
        set: function (value) {
            if (tiltShiftRadius === value) {
                return;
            }

            tiltShiftRadius = value;

            if ((tiltShiftRadius === null) || (tiltShiftRadius === false)) {
                if (gameObject._tiltShift) {
                    fxFactory.remove(gameObject._tiltShift);
                    gameObject._tiltShift = undefined;
                }
            } else {
                if (!gameObject._tiltShift) {
                    gameObject._tiltShift = fxFactory.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
                }

                gameObject._tiltShift.radius = tiltShiftRadius;
            }

        },
    })

    Object.defineProperty(gameObject, 'tiltShiftAmount', {
        get: function () {
            return tiltShiftAmount;
        },
        set: function (value) {
            if (tiltShiftAmount === value) {
                return;
            }

            tiltShiftAmount = value;

            if (gameObject._tiltShift) {
                gameObject._tiltShift.amount = tiltShiftAmount;
            }
        },
    })

    Object.defineProperty(gameObject, 'tiltShiftContrast', {
        get: function () {
            return tiltShiftContrast;
        },
        set: function (value) {
            if (tiltShiftContrast === value) {
                return;
            }

            tiltShiftContrast = value;

            if (gameObject._tiltShift) {
                gameObject._tiltShift.contrast = tiltShiftContrast;
            }
        },
    })

    Object.defineProperty(gameObject, 'tiltShiftBlurX', {
        get: function () {
            return tiltShiftBlurX;
        },
        set: function (value) {
            if (tiltShiftBlurX === value) {
                return;
            }

            tiltShiftBlurX = value;

            if (gameObject._tiltShift) {
                gameObject._tiltShift.blurX = tiltShiftBlurX;
            }
        },
    })

    Object.defineProperty(gameObject, 'tiltShiftBlurY', {
        get: function () {
            return tiltShiftBlurY;
        },
        set: function (value) {
            if (tiltShiftBlurY === value) {
                return;
            }

            tiltShiftBlurY = value;

            if (gameObject._tiltShift) {
                gameObject._tiltShift.blurY = tiltShiftBlurY;
            }
        },
    })

    Object.defineProperty(gameObject, 'tiltShiftStrength', {
        get: function () {
            return tiltShiftStrength;
        },
        set: function (value) {
            if (tiltShiftStrength === value) {
                return;
            }

            tiltShiftStrength = value;

            if (gameObject._tiltShift) {
                gameObject._tiltShift.strength = tiltShiftStrength;
            }
        },
    })

    gameObject.tiltShiftRadius = null;

    AddClearEffectCallback(gameObject, 'tiltShiftRadius');

    return gameObject;
}

export default AddTiltShiftProperties;