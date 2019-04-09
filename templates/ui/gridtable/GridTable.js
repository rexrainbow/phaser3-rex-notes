import Sizer from '../sizer/Sizer.js';
import SCROLLMODE from '../utils/ScrollModeConst.js';
import GridTableCore from '../../../plugins/gameobjects/gridtable/GridTable.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';
import SetItems from './SetItems.js';
import TableSetInteractive from './TableSetInteractive.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        var scrollMode = GetValue(config, 'scrollMode', 0); // vertical
        if (typeof (scrollMode) === 'string') {
            scrollMode = SCROLLMODE[tableOrientation];
        }

        // Create sizer
        config.orientation = scrollMode; // Left-to-right, or top-to-bottom
        super(scene, config);
        this.type = 'rexGridTable';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var tableConfig = GetValue(config, 'table', undefined)
        var sliderConfig = GetValue(config, 'slider', undefined);
        var scrollerConfig = GetValue(config, 'scroller', true);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var tableSpace = GetValue(config, 'space.table', 0);

        if (background) {
            this.addBackground(background);
        }

        if (tableConfig === undefined) {
            tableConfig = {};
        }
        tableConfig.scrollMode = scrollMode;
        tableConfig.clamplTableOXY = false;
        var tableWidth = GetValue(tableConfig, 'width', undefined);
        var tableHeight = GetValue(tableConfig, 'height', undefined);
        var table = new GridTableCore(scene, 0, 0, tableWidth, tableHeight, tableConfig);
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
            if (container.setOrigin) {
                container.setOrigin(0);
            }
            if (container.isRexSizer) {
                container.layout(); // Use original size
            }

            cell.item = undefined;
            cell.setContainer(container);
        }, this);

        var proportion, padding, expand;
        if (scrollMode === 0) {
            proportion = (tableWidth === undefined) ? 1 : 0;
            padding = {
                left: paddingLeft,
                right: (sliderConfig) ? tableSpace : paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            };
            expand = (tableHeight === undefined);
        } else {
            proportion = (tableHeight === undefined) ? 1 : 0;
            padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (sliderConfig) ? tableSpace : paddingBottom
            };
            expand = (tableWidth === undefined);
        }
        this.add(table, proportion, 'center', padding, expand);

        var slider;
        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderConfig.orientation = this.orientation;
            slider = new Slider(scene, sliderConfig);
            var padding;
            if (scrollMode === 0) {
                padding = {
                    left: 0,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: 0,
                    bottom: paddingBottom
                }
            }
            this.add(slider, 0, 'center', padding, true);
        }

        var scroller;
        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scrollerConfig.orientation = scrollMode;
            scroller = new Scroller(table, scrollerConfig);
        }

        // Control
        if (slider) {
            slider.on('valuechange', function (newValue) {
                table.t = newValue;
                this.updateController();
            }, this);
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                table.tableOY = newValue;
                this.updateController();
            }, this);
        }


        this.addChildrenMap('background', background);
        this.addChildrenMap('table', table);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);

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

    updateController() {
        var table = this.childrenMap.table;
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setValue(table.tableOY);
        }
        if (slider) {
            slider.setValue(table.t);
        }
    }

    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);

        var scroller = this.childrenMap.scroller;
        if (scroller) {
            var table = this.childrenMap.table;
            var bottomOY = table.bottomTableOY,
                topOY = table.topTableOY;
            scroller.setBounds(bottomOY, topOY);
        }
        return this;
    }

    refresh() {
        this.childrenMap.table.updateTable(true);
        return this;
    }

    set t(value) {
        this.childrenMap.table.t = value;
        this.updateController();
    }

    get t() {
        return this.childrenMap.table.t;
    }

    setTableOYByPercentage(value) {
        this.t = value;
        return this;
    }

    set tableOY(value) {
        this.childrenMap.table.tableOY = value;
        this.updateController();
    }

    get tableOY() {
        return this.childrenMap.table.tableOY;
    }

    setTableOY(value) {
        this.tableOY = value;
        return this;
    }

    get topTableOY() {
        return this.childrenMap.table.topTableOY;
    }

    get bottomTableOY() {
        return this.childrenMap.table.bottomTableOY;
    }

    scrollToTop() {
        this.t = 0;
        return this;
    }

    scrollToBottom() {
        this.t = 1;
        return this;
    }

    enableScrolling(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setEnable(enabled);
        }
        if (slider) {
            slider.setEnable(enabled);
        }
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