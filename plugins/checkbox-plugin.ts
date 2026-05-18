import Factory from './gameobjects/shape/checkbox/Factory';
import Creator from './gameobjects/shape/checkbox/Creator';
import Checkbox from './gameobjects/shape/checkbox/Checkbox';
import CheckboxShapeFactory from './gameobjects/shape/checkbox/CheckboxShapeFactory';
import CheckboxShapeCreator from './gameobjects/shape/checkbox/CheckboxShapeCreator';
import CheckboxShape from './gameobjects/shape/checkbox/CheckboxShape';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CheckboxPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCheckbox', Factory, Creator);
        pluginManager.registerGameObject('rexCheckboxShape', CheckboxShapeFactory, CheckboxShapeCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Checkbox', Checkbox);
SetValue(window, 'RexPlugins.GameObjects.CheckboxShape', CheckboxShape);

export default CheckboxPlugin;