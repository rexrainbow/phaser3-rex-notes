import StatesText from '../../statestext/StatesText.js';
import BBCodeText from '../../bbcodetext/BBCodeText.js';
import SimpleLabel from '../../simplelabel/SimpleLabel.js';
import DecorateGameObject from './DecorateGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const PhaserBitmapText = Phaser.GameObjects.BitmapText;

var CreateText = function (scene, config) {
    var type = GetValue(config, '$type');
    if (type === undefined) {
        if (!!GetValue(config, 'key')) {
            type = 'bitmaptext';
        }
    }

    var gameObject;
    switch (type) {
        case 'bitmaptext':
        case 'bitmap':
            var key = GetValue(config, 'key');
            var size = GetValue(config, 'size');
            if (size === undefined) {
                size = GetValue(config, 'fontSize');
            }

            gameObject = new PhaserBitmapText(scene, 0, 0, key, '', size);

            var color = GetValue(config, 'color');
            if (color !== undefined) {
                gameObject.setTint(color);
            }
            break;

        case 'bbcodetext':
        case 'bbcode':
            gameObject = new BBCodeText(scene, 0, 0, '', config);
            break;

        case 'label':
            gameObject = new SimpleLabel(scene, config);
            break;

        case 'text':
        default:
            gameObject = new StatesText(scene, config);
            break;
    }

    DecorateGameObject(gameObject, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateText;