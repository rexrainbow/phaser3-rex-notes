import Scrollable from '../utils/scrollable/Scrollable.js';
import GetScrollMode from '../utils/GetScrollMode.js';
import GridTableCore from '../../../plugins/gameobjects/gridtable/GridTable.js';
import InjectProperties from './InjectProperties.js';
import TableOnCellVisible from './TableOnCellVisible.js';
import TableSetInteractive from './input/TableSetInteractive.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';
import SetItems from './SetItems.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create grid table core
        var scrollMode = GetScrollMode(config);
        var tableConfig = GetValue(config, 'table', undefined)
        if (tableConfig === undefined) {
            tableConfig = {};
        }
        tableConfig.scrollMode = scrollMode;
        tableConfig.clamplTableOXY = GetValue(config, 'clamplChildOY', false);
        var tableWidth = GetValue(tableConfig, 'width', undefined);
        var tableHeight = GetValue(tableConfig, 'height', undefined);
        var table = new GridTableCore(scene, 0, 0, tableWidth, tableHeight, tableConfig);
        var proportion, expand;
        if (scrollMode === 0) {
            proportion = (tableWidth === undefined) ? 1 : 0;
            expand = (tableHeight === undefined);
        } else {
            proportion = (tableHeight === undefined) ? 1 : 0;
            expand = (tableWidth === undefined);
        }
        // Inject properties for scrollable interface
        InjectProperties(table);

        // Fill config of scrollable
        config.type = 'rexGridTable';
        config.child = {
            gameObject: table,
            proportion: proportion,
            expand: expand,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = spaceConfig.table;
        }
        super(scene, config);

        this.addChildrenMap('table', table);

        this.eventEmitter = GetValue(config, 'eventEmitter', this);
        var callback = GetValue(config, 'createCellContainerCallback', NOOP);
        var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);
        this.setCreateCellContainerCallback(callback, scope);

        TableOnCellVisible.call(this, table);

        if (GetValue(tableConfig, 'interactive', true)) {
            TableSetInteractive.call(this, table);
        }
        this.setItems(GetValue(config, 'items', []));
    }

    setCreateCellContainerCallback(callback, scope) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
    }

    refresh() {
        var table = this.childrenMap.child;
        table.updateTable(true);
        return this;
    }
}

var methods = {
    setItems: SetItems
}
Object.assign(
    GridTable.prototype,
    methods
);

export default GridTable;