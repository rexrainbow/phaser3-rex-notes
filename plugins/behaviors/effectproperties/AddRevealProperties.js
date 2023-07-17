import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddRevealProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'revealLeft')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var revealLeft,
        revealRight,
        revealUp,
        revealDown,
        revealWidth = 0.1;

    var ClearRevealFlags = function () {
        revealLeft = null;
        revealRight = null;
        revealUp = null;
        revealDown = null;
    }

    var RemoveEffect = function (gameObject) {
        if (gameObject._revealEffect) {
            fxFactory.remove(gameObject._revealEffect);
            gameObject._revealEffect = undefined;
        }
    }

    Object.defineProperty(gameObject, 'revealLeft', {
        get: function () {
            return revealLeft;
        },
        set: function (value) {
            if (revealLeft === value) {
                return;
            }

            ClearRevealFlags();

            revealLeft = value;

            if ((revealLeft === null) || (revealLeft === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._revealEffect) {
                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                }

                gameObject._revealEffect.direction = 1;
                gameObject._revealEffect.axis = 0;
                gameObject._revealEffect.progress = revealLeft;
            }

        },
    })

    Object.defineProperty(gameObject, 'revealRight', {
        get: function () {
            return revealRight;
        },
        set: function (value) {
            if (revealRight === value) {
                return;
            }

            ClearRevealFlags();

            revealRight = value;

            if ((revealRight === null) || (revealRight === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._revealEffect) {
                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                }
                gameObject._revealEffect.direction = 0;
                gameObject._revealEffect.axis = 0;
                gameObject._revealEffect.progress = revealRight;
            }

        },
    })

    Object.defineProperty(gameObject, 'revealUp', {
        get: function () {
            return revealUp;
        },
        set: function (value) {
            if (revealUp === value) {
                return;
            }

            ClearRevealFlags();

            revealUp = value;

            if ((revealUp === null) || (revealUp === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._revealEffect) {
                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                }
                gameObject._revealEffect.direction = 1;
                gameObject._revealEffect.axis = 1;
                gameObject._revealEffect.progress = revealUp;
            }

        },
    })

    Object.defineProperty(gameObject, 'revealDown', {
        get: function () {
            return revealDown;
        },
        set: function (value) {
            if (revealDown === value) {
                return;
            }

            ClearRevealFlags();

            revealDown = value;

            if ((revealDown === null) || (revealDown === false)) {
                RemoveEffect(gameObject);
            } else {
                if (!gameObject._revealEffect) {
                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                }
                gameObject._revealEffect.direction = 0;
                gameObject._revealEffect.axis = 1;
                gameObject._revealEffect.progress = revealDown;
            }

        },
    })

    Object.defineProperty(gameObject, 'revealWidth', {
        get: function () {
            return revealWidth;
        },
        set: function (value) {
            if (revealWidth === value) {
                return;
            }

            revealWidth = value;

            if (gameObject._revealEffect) {
                gameObject._revealEffect.wipeWidth = revealWidth;
            }
        },
    })

    gameObject.revealLeft = null;

    AddClearEffectCallback(gameObject, 'revealLeft');
    AddClearEffectCallback(gameObject, 'revealRight');
    AddClearEffectCallback(gameObject, 'revealUp');
    AddClearEffectCallback(gameObject, 'revealDown');

    return gameObject;
}

export default AddRevealProperties;