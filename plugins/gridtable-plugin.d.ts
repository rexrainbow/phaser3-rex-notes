import Factory from './gameobjects/container/gridtable/Factory';
import Creator from './gameobjects/container/gridtable/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexGridTable: typeof Factory,
        }

        interface GameObjectCreator {
            rexGridTable: typeof Creator,
        }
    }
}