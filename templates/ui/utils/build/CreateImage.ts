import StatesImage from '../../statesimage/StatesImage';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';
import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';
import DecorateGameObject from './DecorateGameObject';

var CreateImage = function(scene?: any, config?: any) {
    var gameObjectType;
    if (config?: any) {
        if (config.hasOwnProperty('$type')) {
            gameObjectType = config.$type;
        } else {
            if (config.hasOwnProperty('leftWidth')) {
                gameObjectType = 'nineSlice';
            } else if (config.hasOwnProperty('color') || config.hasOwnProperty('strokeColor')) {
                gameObjectType = 'roundRectangle';
            }
        }
    }

    var gameObject;
    switch (gameObjectType?: any) {
        case 'nineSlice':
            if (!config.hasOwnProperty('stretchMode')) {
                gameObject = new StatesNineSlice(scene, config);
            } else {
                gameObject = new StatesNinePatch(scene, config);
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