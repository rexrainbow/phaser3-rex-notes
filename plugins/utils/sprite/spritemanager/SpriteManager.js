import GOManager from '../../gameobject/gomanager/GOManager.js';
import SpriteBob from './SpriteBob.js';
import Methods from './methods/Methods.js';
import GetCreateGameObjectCallback from './methods/GetCreateGameObjectCallback.js';

class SpriteManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.BobClass = SpriteBob;

        super(scene, config);
    }

    setCreateGameObjectCallback(callback, scope) {
        callback = GetCreateGameObjectCallback(callback);
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

}

Object.assign(
    SpriteManager.prototype,
    Methods
);

export default SpriteManager;