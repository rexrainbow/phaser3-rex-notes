import Factory from './gameobjects/canvas/canvas/Factory.js';
import Creator from './gameobjects/canvas/canvas/Creator.js';

export default class extends Phaser.Plugins.BasePlugin { }

import 'phaser';
declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCanvas: typeof Factory,
        }

        interface GameObjectCreator {
            rexCanvas: typeof Creator,
        }
    }
}