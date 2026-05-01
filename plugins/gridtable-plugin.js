import Factory from './gameobjects/container/gridtable/Factory.js';
import Creator from './gameobjects/container/gridtable/Creator.js';
import GridTable from './gameobjects/container/gridtable/GridTable.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class GridTablePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexGridTable', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.GridTable', GridTable);

export default GridTablePlugin;