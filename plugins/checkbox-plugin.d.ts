import Factory from './gameobjects/shape/checkbox/Factory';
import Creator from './gameobjects/shape/checkbox/Creator';
import CheckboxShapeFactory from './gameobjects/shape/checkbox/CheckboxShapeFactory.js';
import CheckboxShapeCreator from './gameobjects/shape/checkbox/CheckboxShapeCreator.js';

export default class extends Phaser.Plugins.BasePlugin { }

declare module 'phaser' {
    namespace GameObjects {
        interface GameObjectFactory {
            rexCheckbox: typeof Factory,
            rexCheckboxShape: typeof CheckboxShapeFactory,
        }

        interface GameObjectCreator {
            rexCheckbox: typeof Creator,
            rexCheckboxShape: typeof CheckboxShapeCreator,
        }
    }
}