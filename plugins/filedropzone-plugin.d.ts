import Factory from './gameobjects/dom/filedropzone/Factory';
import Creator from './gameobjects/dom/filedropzone/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexFileDropZone: typeof Factory,
        }

        interface GameObjectCreator {
            rexFileDropZone: typeof Creator,
        }
    }
}