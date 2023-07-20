import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice.js';
import StatesImage from '../../statesimage/StatesImage.js';
import NinePatch from '../../ninepatch/NinePatch.js';

var CreateBackground = function (scene, config) {
    var gameObjectType;
    if (config) {
        if (config.hasOwnProperty('type')) {
            gameObjectType = config.type;
        } else {
            if (config.hasOwnProperty('leftWidth')) {
                gameObjectType = 'nineSlice';
            } else if (config.hasOwnProperty('key')) {
                gameObjectType = 'image';
            }
        }
    }

    var gameObject;
    switch (gameObjectType) {
        case 'image':
            gameObject = new StatesImage(scene, config);
            break;

        case 'nineSlice':
            if (!config.hasOwnProperty('stretchMode')) {
                gameObject = new StatesNineSlice(scene, config);
            } else {
                gameObject = new NinePatch(scene, config);
            }
            break;

        default:
            gameObject = new StatesRoundRectangle(scene, config);
            break;
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBackground;