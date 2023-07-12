import HasProperty from '../../../utils/object/HasProperty.js';

var AddTechnicolorProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'technicolor') || !gameObject.preFX) {
        return gameObject;
    }

    var technicolor;
    Object.defineProperty(gameObject, 'technicolor', {
        get: function () {
            return technicolor;
        },
        set: function (value) {
            if (technicolor === value) {
                return;
            }

            technicolor = value;

            if ((technicolor === null) || (technicolor === false)) {
                if (gameObject._technicolorEffect) {
                    gameObject.preFX.remove(gameObject._technicolorEffect);
                    gameObject._technicolorEffect = undefined;
                }
            } else {
                if (!gameObject._technicolorEffect) {
                    gameObject._technicolorEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._technicolorEffect.technicolor();
            }

        },
    })

    gameObject.technicolor = null;

    return gameObject;
}

export default AddTechnicolorProperties;