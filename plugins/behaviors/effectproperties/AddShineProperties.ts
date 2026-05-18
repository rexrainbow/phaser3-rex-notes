import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';
import InstallShineFX from '../../shaders/p3fx/InstallShineFX';

var AddShineProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shineSpeed')) {
        return gameObject;
    }

    InstallShineFX(gameObject);

    var filterList = GetFilterList(gameObject);

    var shineSpeed,
        shineLineWidth = 0.5,
        shineGradient = 3;
    Object.defineProperty(gameObject, 'shineSpeed', {
        get: function() {
            return shineSpeed;
        },
        set: function(value?: any) {
            if (shineSpeed === value) {
                return;
            }

            shineSpeed = value;

            if ((shineSpeed === null) || (shineSpeed === false)) {
                if (gameObject._shine) {
                    filterList.remove(gameObject._shine);
                    gameObject._shine = undefined;
                }
            } else {
                if (!gameObject._shine) {
                    gameObject._shine = filterList.addP3Shine(shineSpeed, shineLineWidth, shineGradient);
                }

                gameObject._shine.speed = shineSpeed;
            }

        },
    })

    Object.defineProperty(gameObject, 'shineLineWidth', {
        get: function() {
            return shineLineWidth;
        },
        set: function(value?: any) {
            if (shineLineWidth === value) {
                return;
            }

            shineLineWidth = value;

            if (gameObject._shine) {
                gameObject._shine.lineWidth = shineLineWidth;
            }
        },
    })

    Object.defineProperty(gameObject, 'shineGradient', {
        get: function() {
            return shineGradient;
        },
        set: function(value?: any) {
            if (shineGradient === value) {
                return;
            }

            shineGradient = value;

            if (gameObject._shine) {
                gameObject._shine.gradient = shineGradient;
            }
        },
    })

    gameObject.shineSpeed = null;

    AddClearEffectCallback(gameObject, 'shineSpeed');

    return gameObject;
}

export default AddShineProperties;