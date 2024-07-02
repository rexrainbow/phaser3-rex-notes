import StatesText from '../../statestext/StatesText.js';
import BBCodeText from '../../bbcodetext/BBCodeText.js';
import StatesBitmapText from '../../statesbitmaptext/StatesBitmapText.js';
import SimpleLabel from '../../simplelabel/SimpleLabel.js';
import CreateTextArea from './CreateTextArea.js';
import DecorateGameObject from './DecorateGameObject.js';

var CreateText = function (scene, config) {
    var gameObjectType;
    if (config) {
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
    switch (gameObjectType) {
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