import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';
import StatesBarRectangle from '../../statesbarrectangle/StatesBarRectangle.js';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice.js';
import StatesImage from '../../statesimage/StatesImage.js';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch.js';
import DecorateGameObject from './DecorateGameObject.js';

var CreateBackground = function (scene, config) {
    var gameObjectType;
    if (config) {
        if (config.hasOwnProperty('$type')) {
            gameObjectType = config.$type;
        } else {
            if (config.hasOwnProperty('barColor')) {
                gameObjectType = 'bar';
            } else if (config.hasOwnProperty('leftWidth')) {
                gameObjectType = 'nineSlice';
            } else if (config.hasOwnProperty('key')) {
                gameObjectType = 'image';
            }
        }
    }

    var gameObject;
    switch (gameObjectType) {
        case 'bar':
            gameObject = new StatesBarRectangle(scene, config);
            break;

        case 'image':
            gameObject = new StatesImage(scene, config);
            break;

        case 'nineSlice':
            if (!config.hasOwnProperty('stretchMode')) {
                gameObject = new StatesNineSlice(scene, config);
            } else {
                gameObject = new StatesNinePatch(scene, config);
            }
            break;

        default:
            gameObject = new StatesRoundRectangle(scene, config);
            break;
    }

    DecorateGameObject(gameObject, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBackground;