import Tabs from '../tabs/Tabs.js';
import Table from '../gridtable/GridTable.js';
import GetElement from '../utils/GetElement.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TabsTable extends Tabs {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        config.panel = new Table(scene, config);
        super(scene, config);
        this.type = 'rexTabsTable';
    }
}

var methods = {
    getElement: GetElement,
}
Object.assign(
    TabsTable.prototype,
    methods
);

const defaultConfig = {};

export default TabsTable;