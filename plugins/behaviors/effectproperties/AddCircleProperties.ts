import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';
import InstallCircleFX from '../../shaders/p3fx/InstallCircleFX';

var AddCircleProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'circleColor')) {
        return gameObject;
    }

    InstallCircleFX(gameObject);

    var filterList = GetFilterList(gameObject);

    var circleColor,
        circleThickness = 8,
        circleBackgroundColor = 0x000000,
        circleBackgroundAlpha = 0.4,
        circleScale = 1,
        circleFeather = 0.005;
    Object.defineProperty(gameObject, 'circleColor', {
        get: function() {
            return circleColor;
        },
        set: function(value?: any) {
            if (circleColor === value) {
                return;
            }

            circleColor = value;

            if ((circleColor === null) || (circleColor === false)) {
                if (gameObject._circle) {
                    filterList.remove(gameObject._circle);
                    gameObject._circle = undefined;
                }
            } else {
                if (!gameObject._circle) {
                    gameObject._circle = filterList.addP3Circle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
                    gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
                }

                gameObject._circle.color = circleColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'circleThickness', {
        get: function() {
            return circleThickness;
        },
        set: function(value?: any) {
            if (circleThickness === value) {
                return;
            }

            circleThickness = value;

            if (gameObject._circle) {
                gameObject._circle.thickness = circleThickness;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleBackgroundColor', {
        get: function() {
            return circleBackgroundColor;
        },
        set: function(value?: any) {
            if (circleBackgroundColor === value) {
                return;
            }

            circleBackgroundColor = value;

            if (gameObject._circle) {
                gameObject._circle.backgroundColor = circleBackgroundColor;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
        get: function() {
            return circleBackgroundAlpha;
        },
        set: function(value?: any) {
            if (circleBackgroundAlpha === value) {
                return;
            }

            circleBackgroundAlpha = value;

            if (gameObject._circle) {
                gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
            }
        },
    })


    Object.defineProperty(gameObject, 'circleScale', {
        get: function() {
            return circleScale;
        },
        set: function(value?: any) {
            if (circleScale === value) {
                return;
            }

            circleScale = value;

            if (gameObject._circle) {
                gameObject._circle.scale = circleScale;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleFeather', {
        get: function() {
            return circleFeather;
        },
        set: function(value?: any) {
            if (circleFeather === value) {
                return;
            }

            circleFeather = value;

            if (gameObject._circle) {
                gameObject._circle.feather = circleFeather;
            }
        },
    })

    gameObject.circleColor = null;

    AddClearEffectCallback(gameObject, 'circleColor');

    return gameObject;
}

export default AddCircleProperties;