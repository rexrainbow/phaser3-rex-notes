'use strict'

import GridTable from './gridtable/GridTable.js'

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexGridTable', function (x, y, width, height, config) {
    return this.displayList.add(new GridTable(this.scene, x, y, width, height, config));
});
Phaser.GameObjects.GameObjectCreator.register('rexGridTable', function (config) {
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var table = new GridTable(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, table, config);
    return table;
});

export default GridTable;