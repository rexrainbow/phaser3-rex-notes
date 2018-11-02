import GridTable from './gameobjects/gridtable/GridTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexGridTable', function (x, y, width, height, config) {
    var table = new GridTable(this.scene, x, y, width, height, config);
    this.displayList.add(table);
    return table;
});
Phaser.GameObjects.GameObjectCreator.register('rexGridTable', function (config) {
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
});

export default GridTable;