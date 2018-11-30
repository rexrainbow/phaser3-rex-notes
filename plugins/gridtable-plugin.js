import GridTable from './gameobjects/gridtable/GridTable.js';
import SetValue from './utils/object/SetValue.js';

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
        var table = new GridTable(this.scene, x, y, width, height, config);
        this.displayList.add(table);
        return table;
    }

    makeGridTable(config) {
        var width = GetValue(config, 'width', 256);
        var height = GetValue(config, 'height', 256);
        var table = new GridTable(this.scene, 0, 0, width, height, config);

        // set properties wo modify children
        table.syncChildrenEnable = false;
        BuildGameObject(this.scene, table, config);
        // sync properties of children
        table.syncChildrenEnable = true;
        table.syncPosition().syncVisible().syncAlpha();

        return table;
    }
}

SetValue(window, 'RexPlugins.GameObjects.GridTable', GridTable);

export default GridTablePlugin;