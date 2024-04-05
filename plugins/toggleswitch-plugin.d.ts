import Factory from './gameobjects/shape/toggleswitch/Factory';
import Creator from './gameobjects/shape/toggleswitch/Creator';
import ToggleSwitchShapeFactory from './gameobjects/shape/toggleswitch/ToggleSwitchShapeFactory';
import ToggleSwitchShapeCreator from './gameobjects/shape/toggleswitch/ToggleSwitchShapeCreator';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexToggleSwitch: typeof Factory,
            rexToggleSwitchShape: typeof ToggleSwitchShapeFactory,
        }

        interface GameObjectCreator {
            rexToggleSwitch: typeof Creator,
            rexToggleSwitchShape: typeof ToggleSwitchShapeCreator,
        }
    }
}