import Factory from './gameobjects/dynamictext/canvasinput/Factory';
import Creator from './gameobjects/dynamictext/canvasinput/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCanvasInput: typeof Factory,
        }

        interface GameObjectCreator {
            rexCanvasInput: typeof Creator,
        }
    }
}