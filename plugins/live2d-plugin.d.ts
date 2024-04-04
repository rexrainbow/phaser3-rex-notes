import {
    Live2dCoreScriptFileCallback,
    Live2dFileCallback
} from './gameobjects/live2d/index';
import Factory from './gameobjects/live2d/gameobject/Factory';
import Creator from './gameobjects/live2d/gameobject/Creator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace Loader {
        interface LoaderPlugin {
            rexLive2dCoreScript: typeof Live2dCoreScriptFileCallback,
            rexLive2d: typeof Live2dFileCallback,
        }
    }

    namespace GameObjects {
        interface GameObjectFactory {
            rexLive2d: typeof Factory,
        }

        interface GameObjectCreator {
            rexLive2d: typeof Creator,
        }
    }
}