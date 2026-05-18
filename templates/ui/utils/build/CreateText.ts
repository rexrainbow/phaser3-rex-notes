import StatesText from '../../statestext/StatesText';
import BBCodeText from '../../bbcodetext/BBCodeText';
import StatesBitmapText from '../../statesbitmaptext/StatesBitmapText';
import SimpleLabel from '../../simplelabel/SimpleLabel';
import CreateTextArea from './CreateTextArea';
import DecorateGameObject from './DecorateGameObject';

var CreateText = function(scene?: any, config?: any) {
    var gameObjectType;
    if (config?: any) {
        if (config.hasOwnProperty('$type')) {
            gameObjectType = config.$type;
        } else {
            if (config.hasOwnProperty('key')) {
                gameObjectType = 'bitmaptext';
                config.font = config.key;
            }
        }
    }

    var gameObject;
    switch (gameObjectType?: any) {
        case 'bitmaptext':
        case 'bitmap':
            gameObject = new StatesBitmapText(scene, config);
            break;

        case 'bbcodetext':
        case 'bbcode':
            gameObject = new BBCodeText(scene, 0, 0, '', config);
            break;

        case 'label':
            gameObject = new SimpleLabel(scene, config);
            break;

        case 'textarea':
            gameObject = CreateTextArea(scene, config);
            break;

        default:
            gameObject = new StatesText(scene, config);
            break;
    }

    DecorateGameObject(gameObject, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateText;