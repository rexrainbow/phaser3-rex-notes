import GOManager from '../../gameobject/gomanager/GOManager';
import SpriteBob from './SpriteBob';
import Methods from './methods/Methods';
import GetCreateGameObjectCallback from './methods/GetCreateGameObjectCallback';

class SpriteManager extends GOManager {
    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        config.BobClass = SpriteBob;

        super(scene, config);
    }

    setCreateGameObjectCallback(callback?: any, scope?: any) {
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