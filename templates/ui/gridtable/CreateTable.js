import GridTable from 'rexPlugins/gameobjects/gridtable/GridTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTable = function (scene, config) {
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);
    var table = new GridTable(scene, 0, 0, width, height, config);
    return table;
}

export default CreateTable;