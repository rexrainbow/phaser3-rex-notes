import Factory from './gameobjects/layer/stencillayers/Factory';
import Creator from './gameobjects/layer/stencillayers/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexStencilLayers: typeof Factory,
        }

        interface GameObjectCreator {
            rexStencilLayers: typeof Creator,
        }
    }
}
