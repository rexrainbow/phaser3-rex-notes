import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';
import StatesBarRectangle from '../../statesbarrectangle/StatesBarRectangle';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesImage from '../../statesimage/StatesImage';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';
import DecorateGameObject from './DecorateGameObject';

var CreateBackground = function(scene?: any, config?: any) {
    var gameObjectType;
    if (config?: any) {
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
    switch (gameObjectType?: any) {
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