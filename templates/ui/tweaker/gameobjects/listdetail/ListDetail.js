import SplitPanels from '../../../splitpanels/SplitPanels.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import EditorContainer from './scrollable/EditorContainer.js';
import ListTable from './gridtable/ListTable.js';
import OnToolbarMethods from './OnToolbarMethods.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ListDetail extends SplitPanels {
    constructor(scene, config) {
        var {
            isHorizontalView,
            space = {},
            height,
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
            // Title (header)
            editorIndexLabel,
            editorDisplayNameLabel,
            indexLabelCallback,
            displayNameLabelCallback,
            // Toolbar (footer)
            editorDeleteButton,
            editorDuplicateButton,
            editorResetButton,
            editorPreviousButton,
            editorNextButton,

            splitRatio,
            minLeftPanelWidth,
            minRightPanelWidth,
            minTopPanelWidth,
            minBottomPanelWidth,
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
        var editorContainer = new EditorContainer(scene, {
            scrollMode: 0,

            panel: {
                child: editor,
                mask: {
                    padding: 1,
                },
            },

            slider: editorSlider,

            editor: editor,
            editorIndexLabel: editorIndexLabel,
            editorDisplayNameLabel: editorDisplayNameLabel,

            editorDeleteButton: editorDeleteButton,
            editorDuplicateButton: editorDuplicateButton,
            editorResetButton: editorResetButton,
            editorPreviousButton: editorPreviousButton,
            editorNextButton: editorNextButton,

            space: {
                panel: space.table,
                header: space.header,
                footer: space.footer,
            }
        });
        scene.add.existing(editorContainer);

        super(scene, {
            orientation: 1,
            header: header,

            leftPanel: (isHorizontalView) ? listTable : undefined,
            topPanel: (isHorizontalView) ? undefined : listTable,

            rightPanel: (isHorizontalView) ? editorContainer : undefined,
            bottomPanel: (isHorizontalView) ? undefined : editorContainer,

            splitter: splitter,
            splitRatio: splitRatio,
            minLeftPanelWidth: minLeftPanelWidth,
            minRightPanelWidth: minRightPanelWidth,
            minTopPanelWidth: minTopPanelWidth,
            minBottomPanelWidth: minBottomPanelWidth,

            background: background,

            height: height,
            space: {
                left: space.left,
                right: space.right,
                top: space.top,
                bottom: space.bottom,
                leftPanelRight: space.splitter,
                rightPanelLeft: space.splitter,
                topPanelBottom: space.splitter,
                bottomPanelTop: space.splitter,
                // more...
            },
        });
        this.type = 'rexTweaker.ListDetail';

        this.alignInputRowTitleStartFlag = GetValue(config, 'alignTitle');
        this.selectedItem = undefined;
        this.selectedIndex = undefined;
        this.indexLabelCallback = indexLabelCallback;
        this.displayNameLabelCallback = displayNameLabelCallback;

        listTable
            .on('select', this.onSelectCell, this)
            .on('items.change', this.onItemsChange, this);

        editorContainer
            .on('toolbar.delete', this.onToolbarDelete, this)
            .on('toolbar.duplicate', this.onToolbarDuplicate, this)
            .on('toolbar.reset', this.onToolbarReset, this)
            .on('toolbar.previous', this.onToolbarPrevious, this)
            .on('toolbar.next', this.onToolbarNext, this);

        editor
            .on('valuechange', this.onEditorValueChange, this);
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

    onEditorValueChange(value, oldValue, bindingTarget, bindingKey) {
        if (!bindingTarget) {
            return;
        }

        var listTable = this.leftPanel;
        var items = listTable.items;
        var index = items.indexOf(bindingTarget);
        if (index === -1) {
            return;
        }

        // Re-run cell callback so displayNameLabel(index, item, items) can be updated.
        listTable.updateVisibleCell(index);
        this.updateEditorTitle(index, bindingTarget, items);
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
        this.updateEditorTitle(index, this.selectedItem, items);

        if (scrollToRow) {
            listTable.scrollToRow(index, 500);
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
        this.updateEditorTitle();

        this.updateVisibleCellSelection();
        this.emit('selectitem', undefined, undefined, listTable.items);
        return this;
    }

    updateEditorTitle(index, item, items) {
        if (index === undefined) {
            this.rightPanel.setTitle(undefined, undefined);
            return this;
        }

        if (items === undefined) {
            items = this.leftPanel.items;
        }

        var indexLabelCallback = this.indexLabelCallback;
        var indexConfig = (indexLabelCallback) ? indexLabelCallback(index, item, items) : undefined;

        var displayNameLabelCallback = this.displayNameLabelCallback;
        var displayNameConfig = (displayNameLabelCallback) ? displayNameLabelCallback(index, item, items) : undefined;

        this.rightPanel.setTitle(indexConfig, displayNameConfig);

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

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        this.leftPanel.setReadOnly(value);
        this.rightPanel.setReadOnly(value);
        return this;
    }
}

Object.assign(
    ListDetail.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
    OnToolbarMethods,
)

export default ListDetail;
