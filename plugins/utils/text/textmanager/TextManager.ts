import GOManager from '../../gameobject/gomanager/GOManager';
import TextBob from './TextBob';
import Methods from './methods/Methods';

class TextManager extends GOManager {
    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        config.BobClass = TextBob;

        super(scene, config);
    }

    setCreateGameObjectCallback(callback?: any, scope?: any) {
        if ((!callback) || (callback === 'text')) {
            callback = CreateTextObject;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

}

var CreateTextObject = function(scene?: any) {
    return scene.add.text(0, 0, '');
}

Object.assign(
    TextManager.prototype,
    Methods
);

export default TextManager;