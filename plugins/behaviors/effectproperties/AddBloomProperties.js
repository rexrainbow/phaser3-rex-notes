import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddBloomProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'bloomColor')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var bloomColor,
        bloomOffsetX = 1,
        bloomOffsetY = 1,
        bloomBlurStrength = 1,
        bloomStrength = 1,
        bloomSteps = 4;
    Object.defineProperty(gameObject, 'bloomColor', {
        get: function () {
            return bloomColor;
        },
        set: function (value) {
            if (bloomColor === value) {
                return;
            }

            bloomColor = value;

            if ((bloomColor === null) || (bloomColor === false)) {
                if (gameObject._bloom) {
                    fxFactory.remove(gameObject._bloom);
                    gameObject._bloom = undefined;
                    fxFactory.setPadding(0);
                }
            } else {
                if (!gameObject._bloom) {
                    gameObject._bloom = fxFactory.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
                    fxFactory.setPadding(Math.max(bloomOffsetX, bloomOffsetY) + 1);
                }

                gameObject._bloom.color = bloomColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'bloomOffsetX', {
        get: function () {
            return bloomOffsetX;
        },
        set: function (value) {
            if (bloomOffsetX === value) {
                return;
            }

            bloomOffsetX = value;

            if (gameObject._bloom) {
                var offset = Math.max(bloomOffsetX, bloomOffsetY);
                fxFactory.setPadding(offset + 1);
                gameObject._bloom.offsetX = bloomOffsetX;
            }
        },
    })

    Object.defineProperty(gameObject, 'bloomOffsetY', {
        get: function () {
            return bloomOffsetY;
        },
        set: function (value) {
            if (bloomOffsetY === value) {
                return;
            }

            bloomOffsetY = value;

            if (gameObject._bloom) {
                var offset = Math.max(bloomOffsetX, bloomOffsetY);
                fxFactory.setPadding(offset + 1);
                gameObject._bloom.offsetY = bloomOffsetY;
            }
        },
    })

    Object.defineProperty(gameObject, 'bloomBlurStrength', {
        get: function () {
            return bloomBlurStrength;
        },
        set: function (value) {
            if (bloomBlurStrength === value) {
                return;
            }

            bloomBlurStrength = value;

            if (gameObject._bloom) {
                gameObject._bloom.blurStrength = bloomBlurStrength;
            }
        },
    })

    Object.defineProperty(gameObject, 'bloomStrength', {
        get: function () {
            return bloomStrength;
        },
        set: function (value) {
            if (bloomStrength === value) {
                return;
            }

            bloomStrength = value;

            if (gameObject._bloom) {
                gameObject._bloom.strength = bloomStrength;
            }
        },
    })

    Object.defineProperty(gameObject, 'bloomSteps', {
        get: function () {
            return bloomSteps;
        },
        set: function (value) {
            if (bloomSteps === value) {
                return;
            }

            bloomSteps = value;

            if (gameObject._bloom) {
                gameObject._bloom.steps = bloomSteps;
            }
        },
    })

    gameObject.bloomColor = null;

    AddClearEffectCallback(gameObject, 'bloomColor');

    return gameObject;
}

export default AddBloomProperties;