import Sizer from '../sizer/Sizer.js';
import Slider from '../slider/Slider.js';
import CreateTable from './CreateTable.js';
import NOOP from 'rexPlugins/utils/object/NOOP.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer
        config.orientation = 0; // Left-to-right
        super(scene, config);
        this.type = 'rexGridTable';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var tableConfig = GetValue(config, 'table', undefined)
        var sliderConfig = GetValue(config, 'slider', undefined);

        if (background) {
            this.addBackground(background);
        }

        var table = CreateTable(scene, tableConfig);
        table.on('cellvisible', function (cell) {
            var callback = this.createCellContainerCallback;
            var scope = this.createCellContainerCallbackScope;
            cell.item = this.items[cell.index];
            var container;
            if (scope) {
                container = callback.call(scope, cell);
            } else {
                container = callback(cell);
            }
            cell.item = undefined;
            cell.setContainer(container);
        }, this);
        this.add(table, 0, 'center', undefined, true);

        var slider;
        if (sliderConfig) {
            sliderConfig.orientation = config.orientation;
            slider = new Slider(scene, sliderConfig);
            slider.on('valuechange', function (newValue) {
                table.setTableOYByPercentage(newValue).updateTable();
            })
            this.add(slider, 0, 'center', undefined, true);
        }

        this.childrenMap = {};
        this.childrenMap.table = table;
        this.childrenMap.slider = slider;

        var callback = GetValue(config, 'createCellContainerCallback', NOOP);
        var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);
        this.setCreateCellContainerCallback(callback, scope)
        this.setItems(GetValue(config, 'items', []));
    }

    setCreateCellContainerCallback(callback, scope) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
    }

    setItems(items) {
        if (items === undefined) {
            this.items.length = 0;
        } else {
            this.items = items;
        }
        this.childrenMap.table.setCellsCount(this.items.length).setTableOY(0).updateTable(true);
        return this;
    }
}

const defaultConfig = {};

var methods = {}
Object.assign(
    GridTable.prototype,
    methods
);

export default GridTable;