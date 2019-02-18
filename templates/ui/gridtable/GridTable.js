import Sizer from '../sizer/Sizer.js';
import CreateTable from './CreateTable.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';
import SetItems from './SetItems.js';
import TableSetInteractive from './TableSetInteractive.js';

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
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var tableConfig = GetValue(config, 'table', undefined)
        var sliderConfig = GetValue(config, 'slider', undefined);
        var scrollerConfig = GetValue(config, 'scrollerConfig', true);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var tableSpace = GetValue(config, 'space.table', 0);

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
            if (container.isRexSizer) {
                container.layout(); // Use original size
            }

            cell.item = undefined;
            cell.setContainer(container);
        }, this);

        var padding = {
            left: paddingLeft,
            right: (sliderConfig) ? tableSpace : paddingRight,
            top: paddingTop,
            bottom: paddingBottom
        }
        this.add(table, 0, 'center', padding, true);

        var slider;
        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderConfig.orientation = this.orientation;
            slider = new Slider(scene, sliderConfig);
            var padding = {
                left: (table) ? 0 : paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            }
            this.add(slider, 0, 'center', padding, true);
        }

        var scroller;
        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scroller = new Scroller(table, scrollerConfig);
        }

        // Control
        var ignored = false; // Set true to ignore event handler
        if (slider) {
            slider.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                table.setTableOYByPercentage(newValue).updateTable();
                // reflect to scroller
                if (scroller) {
                    ignored = true;
                    scroller.setValue(table.tableOY);
                }
            })
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                table.setTableOY(newValue).updateTable();
                // reflect to slider
                if (slider) {
                    ignored = true;
                    slider.setValue(table.getTableOYPercentage());
                }
            });
        }


        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.table = table;
        this.childrenMap.slider = slider;
        this.childrenMap.scroller = scroller;

        TableSetInteractive.call(this, table);
        var callback = GetValue(config, 'createCellContainerCallback', NOOP);
        var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);
        this.setCreateCellContainerCallback(callback, scope);
        this.setItems(GetValue(config, 'items', []));
    }

    setCreateCellContainerCallback(callback, scope) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
    }

}

const defaultConfig = {};

var methods = {
    setItems: SetItems
}
Object.assign(
    GridTable.prototype,
    methods
);

export default GridTable;