import Factory from './gameobjects/stencil/stencillayers/Factory';
import Creator from './gameobjects/stencil/stencillayers/Creator';

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
