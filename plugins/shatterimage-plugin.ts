import ShatterImageFactory from './gameobjects/mesh/shatter/image/Factory';
import ShatterImageCreator from './gameobjects/mesh/shatter/image/Creator';
import ShatterImage from './gameobjects/mesh/shatter/image/Image';

import ShatterRenderTextureFactory from './gameobjects/mesh/shatter/rendertexture/Factory';
import ShatterRenderTextureCreator from './gameobjects/mesh/shatter/rendertexture/Creator';
import ShatterRenderTexture from './gameobjects/mesh/shatter/rendertexture/RenderTexture';

import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class ShatterImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexShatterImage', ShatterImageFactory, ShatterImageCreator);
        pluginManager.registerGameObject('rexShatterRenderTexture', ShatterRenderTextureFactory, ShatterRenderTextureCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ShatterImage', ShatterImage);
SetValue(window, 'RexPlugins.GameObjects.ShatterRenderTexture', ShatterRenderTexture);

export default ShatterImagePlugin;