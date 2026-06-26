import Factory from './gameobjects/layer/stencilmasklayer/Factory';
import Creator from './gameobjects/layer/stencilmasklayer/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexStencilMaskLayer: typeof Factory,
        }

        interface GameObjectCreator {
            rexStencilMaskLayer: typeof Creator,
        }
    }
}
