import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddWipeProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'wipeLeft')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var wipeLeft,
        wipeRight,
        wipeUp,
        wipeDown,
        wipeWidth = 0.1;

    var ClearWipeFlags = function () {
        wipeLeft = null;
        wipeRight = null;
        wipeUp = null;
        wipeDown = null;
    }

    var RemoveEffect = function (gameObject) {
        if (gameObject._wipeEffect) {
            fxFactory.remove(gameObject._wipeEffect);
            gameObject._wipeEffect = undefined;
        }
    }

    Object.defineProperty(gameObject, 'wipeLeft', {
        get: function () {
            return wipeLeft;
        },
        set: function (value) {
            if (wipeLeft === value) {
                return;
            }

            ClearWipeFlags();

            wipeLeft = value;

            if ((wipeLeft === null) || (wipeLeft === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._wipeEffect) {
                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                }

                gameObject._wipeEffect.direction = 1;
                gameObject._wipeEffect.axis = 0;
                gameObject._wipeEffect.progress = wipeLeft;
            }

        },
    })

    Object.defineProperty(gameObject, 'wipeRight', {
        get: function () {
            return wipeRight;
        },
        set: function (value) {
            if (wipeRight === value) {
                return;
            }

            ClearWipeFlags();

            wipeRight = value;

            if ((wipeRight === null) || (wipeRight === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._wipeEffect) {
                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                }
                gameObject._wipeEffect.direction = 0;
                gameObject._wipeEffect.axis = 0;
                gameObject._wipeEffect.progress = wipeRight;
            }

        },
    })

    Object.defineProperty(gameObject, 'wipeUp', {
        get: function () {
            return wipeUp;
        },
        set: function (value) {
            if (wipeUp === value) {
                return;
            }

            ClearWipeFlags();

            wipeUp = value;

            if ((wipeUp === null) || (wipeUp === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._wipeEffect) {
                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                }
                gameObject._wipeEffect.direction = 1;
                gameObject._wipeEffect.axis = 1;
                gameObject._wipeEffect.progress = wipeUp;
            }

        },
    })

    Object.defineProperty(gameObject, 'wipeDown', {
        get: function () {
            return wipeDown;
        },
        set: function (value) {
            if (wipeDown === value) {
                return;
            }

            ClearWipeFlags();

            wipeDown = value;

            if ((wipeDown === null) || (wipeDown === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._wipeEffect) {
                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                }
                gameObject._wipeEffect.direction = 0;
                gameObject._wipeEffect.axis = 1;
                gameObject._wipeEffect.progress = wipeDown;
            }

        },
    })

    Object.defineProperty(gameObject, 'wipeWidth', {
        get: function () {
            return wipeWidth;
        },
        set: function (value) {
            if (wipeWidth === value) {
                return;
            }

            wipeWidth = value;

            if (gameObject._wipeEffect) {
                gameObject._wipeEffect.wipeWidth = wipeWidth;
            }
        },
    })

    gameObject.wipeLeft = null;

    AddClearEffectCallback(gameObject, 'wipeLeft');
    AddClearEffectCallback(gameObject, 'wipeRight');
    AddClearEffectCallback(gameObject, 'wipeUp');
    AddClearEffectCallback(gameObject, 'wipeDown');

    return gameObject;
}

export default AddWipeProperties;