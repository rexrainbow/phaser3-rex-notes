import CreateColumns from '../builders/CreateColumns.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddColumns = function (config) {
    if (config === undefined) {
        config = {};
    }
    if (typeof (config) === 'number') {
        config = {
            columns: config
        }
    }

    // Create columns
    var columnsStyle = GetValue(this.styles, 'columns') || {};
    columnsStyle.tweaker = this.styles;
    columnsStyle.root = this.root;
    var columns = CreateColumns(this, config, columnsStyle);
    delete columnsStyle.tweaker;
    delete columnsStyle.root;

    // Add columns
    this.add(
        columns,
        { expand: true }
    );

    // Set content
    columns.setTitle(config);

    var columnConfigArray = GetValue(config, 'columns', undefined);
    if (columnConfigArray && Array.isArray(columnConfigArray)) {
        for (var i = 0, cnt = columnConfigArray.length; i < cnt; i++) {
            var key = columnConfigArray[i].key;
            if (key) {
                this.root.addChildrenMap(key, columns.getColumn(i));
            }
        }
    }

    return columns.getColumns();
}

export default AddColumns;