import { Actions as PhaserActions } from 'phaser';
import HasProperty from '../../utils/object/HasProperty.js';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddBloomProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'bloomColor')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var bloomColor,
        bloomOffsetX = 1,
        bloomOffsetY = 1,
        bloomBlurStrength = 1,
        bloomStrength = 1,
        bloomSteps = 4;

    var AddBloomEffect = function () {
        gameObject._bloom = PhaserActions.AddEffectBloom(gameObject, {
            useInternal: true,
            blurRadius: Math.max(bloomOffsetX, bloomOffsetY),
            blurSteps: bloomSteps,
            blendAmount: bloomStrength
        })[0];

        gameObject._bloom.threshold.active = false;
        gameObject._bloom.blur.x = bloomOffsetX;
        gameObject._bloom.blur.y = bloomOffsetY;
        gameObject._bloom.blur.strength = bloomBlurStrength;
        gameObject._bloom.blur.color = bloomColor;
    }

    var RemoveBloomEffect = function () {
        if (gameObject._bloom) {
            filterList.remove(gameObject._bloom.parallelFilters);
            gameObject._bloom = undefined;
        }
    }

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
                RemoveBloomEffect();
            } else {
                if (!gameObject._bloom) {
                    AddBloomEffect();
                }

                gameObject._bloom.blur.color = bloomColor;
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
                gameObject._bloom.blur.x = bloomOffsetX;
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
                gameObject._bloom.blur.y = bloomOffsetY;
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
                gameObject._bloom.blur.strength = bloomBlurStrength;
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
                gameObject._bloom.parallelFilters.blend.amount = bloomStrength;
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
                gameObject._bloom.blur.steps = bloomSteps;
            }
        },
    })

    gameObject.bloomColor = null;

    AddClearEffectCallback(gameObject, 'bloomColor');

    return gameObject;
}

// phaser3 vs phaser4
// Phaser 4's AddEffectBloom uses Threshold + Blur + ParallelFilters. The threshold
// is disabled here to better match the Phaser 3 built-in FX bloom behavior.
export default AddBloomProperties;
