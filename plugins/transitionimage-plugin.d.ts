import Factory from './gameobjects/container/transitionimage/Factory';
import Creator from './gameobjects/container/transitionimage/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexTransitionImage: typeof Factory,
        }

        interface GameObjectCreator {
            rexTransitionImage: typeof Creator,
        }
    }
}