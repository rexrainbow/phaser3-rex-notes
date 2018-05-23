'use strict'

'use strict'

import GridTable from './gameobjects/gridtable/GridTable.js'

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class GridTablePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexGridTable', this.addGridTable, this.makeGridTable);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addGridTable(x, y, width, height, config) {
        return this.displayList.add(new GridTable(this.scene, x, y, width, height, config));
    }

    makeGridTable(config) {
        var width = GetValue(config, 'width', 256);
        var height = GetValue(config, 'height', 256);
        var table = new GridTable(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, table, config);
        return table;
    }

}

export default GridTablePlugin;