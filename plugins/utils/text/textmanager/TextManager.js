import GOManager from '../../gameobject/gomanager/GOManager.js';
import TextBob from './TextBob.js';
import BBCodeText from '../../../gameobjects/tagtext/bbcodetext/BBCodeText.js';
import TagText from '../../../gameobjects/tagtext/tagtext/TagText.js';
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
        if (!callback || (callback === 'text')) {
            this.createGameObjectCallback = function (scene) {
                return scene.add.text(0, 0, '');
            }
        } else if (callback === 'bbcodetext') {
            this.createGameObjectCallback = function (scene) {
                var gameObject = new BBCodeText(scene, 0, 0, '');
                scene.add.existing(gameObject);
                return gameObject;
            }
        } else if (callback === 'tag') {
            this.createGameObjectCallback = function (scene) {
                var gameObject = new TagText(scene, 0, 0, '');
                scene.add.existing(gameObject);
                return gameObject;
            }
        } else {
            this.createGameObjectCallback = callback;
        }
        return this;
    }

}

Object.assign(
    TextManager.prototype,
    Methods
);

export default TextManager;