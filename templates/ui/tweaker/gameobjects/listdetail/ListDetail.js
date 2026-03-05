import SplitPanels from '../../../splitpanels/SplitPanels.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import Scrollable from '../scrollable/Scrollable.js';
import ListTable from './gridtable/ListTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ListDetail extends SplitPanels {
    constructor(scene, config) {
        var {
            space = {},
            header,
            splitter,
            background,

            // ListTable at left panel
            listTableConfig,
            createListCellContainerCallback,
            listTableSlider,
            listTableFooter,
            clearButton,
            addButton,

            // Editor at right panel
            editor,
            editorSlider,
        } = config;

        // ListTable at left panel
        var listTable = new ListTable(scene, {
            table: listTableConfig,
            clampChildOY: true,

            footer: listTableFooter,
            clearButton: clearButton,
            addButton: addButton,

            slider: listTableSlider,

            createCellContainerCallback: createListCellContainerCallback,

            space: {
                table: space.table,
                footer: space.footer,
                // more...
            }
        });
        scene.add.existing(listTable);

        // Editor at right panel
        var scrollable = new Scrollable(scene, {
            scrollMode: 0,

            panel: {
                child: editor,
                mask: {
                    padding: 1,
                },
            },

            slider: editorSlider,

            space: {
                panel: space.table,
                // more...
            }
        });
        scene.add.existing(scrollable);

        super(scene, {
            header: header,

            leftPanel: listTable,
            rightPanel: scrollable,

            splitter: splitter,
            splitRatio: GetValue(config, 'splitRatio', 0.5),
            minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
            minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),

            background: background,

            height: GetValue(config, 'height', 0),
            space: {
                left: space.left,
                right: space.right,
                top: space.top,
                bottom: space.bottom,
                leftPanelRight: space.splitter,
                rightPanelLeft: space.splitter,
                // more...
            },
        });
        this.type = 'rexTweaker.ListDetail';

        this.alignInputRowTitleStartFlag = GetValue(config, 'alignTitle');
        this.selectedItem = undefined;
        this.selectedIndex = undefined;

        listTable
            .on('select', this.onSelectCell, this)
            .on('items.change', this.onItemsChange, this);
    }

    onSelectCell(cellContainer, cellIndex) {
        // cellContainer in ListTable (left panel)
        this.selectItem(cellIndex);
    }

    onItemsChange(changeType, detail) {
        // Get selected index -> Update selected index and selected item
        /*
        changeType , detail: 
        - move , {fromIndex, toIndex}
        - delete , {index, item}
        - add , {index, item}
        - clear
        - monitor
        */

        var listTable = this.leftPanel;
        var items = listTable.items;

        if (items.length === 0) {
            // Select no item
            this.clearSelection();
            return;
        }

        var nextIndex;
        var selectedItem = this.selectedItem;
        if (selectedItem !== undefined) {
            nextIndex = items.indexOf(selectedItem);
            // Invalid index
            if (nextIndex === -1) {
                nextIndex = undefined;
            }
        }

        var selectedIndex = this.selectedIndex;
        if (selectedIndex == null) {
            nextIndex = (changeType === 'add') ? detail.index : 0;

        } else {
            switch (changeType) {
                case 'delete':
                    if (detail.index < selectedIndex) {
                        nextIndex = selectedIndex - 1;
                    } else {
                        nextIndex = selectedIndex;
                    }
                    break;

                case 'move':
                    var fromIndex = detail.fromIndex;
                    var toIndex = detail.toIndex;
                    if (selectedIndex === fromIndex) {
                        nextIndex = toIndex;
                    } else if (selectedIndex === toIndex) {
                        nextIndex = fromIndex;
                    } else {
                        nextIndex = selectedIndex;
                    }
                    break;

                case 'clear':
                    this.clearSelection();
                    return;

                default:
                    nextIndex = selectedIndex;
                    break;
            }

        }

        if (nextIndex !== undefined) {
            this.selectItem(nextIndex, false);
        }
    }

    selectItem(index, scrollToRow) {
        if (scrollToRow === undefined) {
            scrollToRow = false;
        }

        var listTable = this.leftPanel;
        var items = listTable.items;
        if (items.length === 0) {
            return this.clearSelection();
        }

        index = Clamp(index, 0, items.length - 1);

        this.selectedIndex = index;
        this.selectedItem = items[index];

        listTable.selectedIndex = index;
        this.rightPanel.setBindingTarget(this.selectedItem);

        if (scrollToRow) {
            listTable.scrollToRow(index);
        }

        this.updateVisibleCellSelection();

        this.emit('selectitem', this.selectedItem, index, items);
        return this;
    }

    clearSelection() {
        this.selectedIndex = undefined;
        this.selectedItem = undefined;

        var listTable = this.leftPanel;
        listTable.selectedIndex = undefined;
        this.rightPanel.setBindingTarget(undefined);

        this.updateVisibleCellSelection();
        this.emit('selectitem', undefined, undefined, listTable.items);
        return this;
    }

    updateVisibleCellSelection() {
        var listTable = this.leftPanel;
        var cellContainers = listTable.getAllCellContainers();
        for (var i = 0, cnt = cellContainers.length; i < cnt; i++) {
            var cellContainer = cellContainers[i];
            cellContainer.setSelectedState(cellContainer.cellIndex === this.selectedIndex);
        }

        return this;
    }

    preLayout() {
        super.preLayout();

        if (this.alignInputRowTitleStartFlag) {
            this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
        }
    }

    setTitle(config) {
        var title = this.childrenMap.header;
        if (config.text || config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }
}

Object.assign(
    ListDetail.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default ListDetail;
