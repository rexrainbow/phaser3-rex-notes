import GOManager from '../../gameobject/gomanager/GOManager.js';
import TextBob from './TextBob.js';
import BBCodeText from '../../../gameobjects/tagtext/bbcodetext/BBCodeText.js';
import Methods from './methods/Methods.js';

class TextManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.BobClass = TextBob;

        super(scene, config);
    }

    setCreateGameObjectCallback(callback) {
        if (!callback) {
            callback = function (scene, textObjectType) {
                switch (textObjectType) {
                    case 'bbcodetext': return CreateBBCodeTextObject(scene);
                    default: return CreateTextObject(scene);
                }
            }
        } else if (callback === 'text') {
            callback = CreateTextObject;
        } else if (callback === 'bbcodetext') {
            callback = CreateBBCodeTextObject;
        }
        super.setCreateGameObjectCallback(callback);
        return this;
    }

}

var CreateTextObject = function (scene) {
    return scene.add.text(0, 0, '');
}

var CreateBBCodeTextObject = function (scene) {
    var gameObject = new BBCodeText(scene, 0, 0, '');
    scene.add.existing(gameObject);
    return gameObject;
}

Object.assign(
    TextManager.prototype,
    Methods
);

export default TextManager;