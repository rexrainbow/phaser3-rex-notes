import StatesImage from '../../statesimage/StatesImage.js';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice.js';
import NinePatch from '../../ninepatch/NinePatch.js';
import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';
import DecorateGameObject from './DecorateGameObject.js';

var CreateImage = function (scene, config) {
    var gameObjectType;
    if (config) {
        if (config.hasOwnProperty('type')) {
            gameObjectType = config.type;
        } else {
            if (config.hasOwnProperty('leftWidth')) {
                gameObjectType = 'nineSlice';
            } else if (config.hasOwnProperty('color')) {
                gameObjectType = 'roundRectangle';
            }
        }
    }

    var gameObject;
    switch (gameObjectType) {
        case 'nineSlice':
            if (!config.hasOwnProperty('stretchMode')) {
                gameObject = new StatesNineSlice(scene, config);
            } else {
                gameObject = new NinePatch(scene, config);
            }
            break;

        case 'roundRectangle':
            gameObject = new StatesRoundRectangle(scene, config);
            break;

        default:
            gameObject = new StatesImage(scene, config);
            break;
    }

    DecorateGameObject(gameObject, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;