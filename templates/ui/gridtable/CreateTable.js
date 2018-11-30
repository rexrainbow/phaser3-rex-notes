import GridTable from '../../../plugins/gameobjects/gridtable/GridTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTable = function (scene, config) {
    if (config === undefined) {
        config = tmpConfig;
    }
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);
    config.clamplTableOXY = false;
    var table = new GridTable(scene, 0, 0, width, height, config);
    return table;
}

var tmpConfig = {};

export default CreateTable;