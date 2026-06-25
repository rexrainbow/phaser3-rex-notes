import Factory from './gameobjects/layer/stencillayer/Factory';
import Creator from './gameobjects/layer/stencillayer/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexStencilLayer: typeof Factory,
        }

        interface GameObjectCreator {
            rexStencilLayer: typeof Creator,
        }
    }
}