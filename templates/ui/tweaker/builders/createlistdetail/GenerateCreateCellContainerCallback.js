import CreateTitleLabel from '../utils/CreateTitleLabel.js';
import CreateDeleteButton from '../utils/CreateDeleteButton.js';
import CreateMoveUpButton from '../utils/CreateMoveUpButton.js';
import CreateMoveDownButton from '../utils/CreateMoveDownButton.js';
import CreateBackground from '../utils/CreateBackground.js';
import CellContainer from '../../gameobjects/listdetail/cellcontainer/CellContainer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Format = Phaser.Utils.String.Format;

var CreateCellContainer = function (parent, cell, config) {
    var scene = parent.scene;

    // Create elements
    var {
        space,
        gridTable,
        indexStyle,
        displayNameStyle,
        createDeleteButton,
        createMoveUpButton,
        createMoveDownButton,
        backgroundStyle,
    } = config;

    var indexLabel = CreateTitleLabel(scene, undefined, indexStyle);

    var displayNameLabel = CreateTitleLabel(scene, undefined, displayNameStyle);

    var deleteButton = createDeleteButton(scene);

    var moveUpButton = createMoveUpButton(scene);

    var moveDownButton = createMoveDownButton(scene);

    var background = CreateBackground(scene, {}, backgroundStyle);

    // Assemble elements
    var cellContainer = new CellContainer(scene, {
        space,
        gridTable,
        background,
        indexLabel,
        displayNameLabel,
        deleteButton,
        moveUpButton,
        moveDownButton,
    })
    scene.add.existing(cellContainer);

    return cellContainer;
}

var GenerateCreateCellContainerCallback = function (parent, config, style) {
    // Prepare parameters
    var space = GetValue(config, 'space.cell', undefined, style) || {};

    var indexStyle = GetValue(style, 'index');
    if (!indexStyle) {
        indexStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }
    var indexLabelCallback = GetValue(config, 'indexLabel', '%1');
    if (typeof (indexLabelCallback) === 'string') {
        var indexLabelTemplate = indexLabelCallback;
        indexLabelCallback = function (index, item, items) {
            // %1=index, %2=total
            return { 'title': Format(indexLabelTemplate, [index, items.length]) };
        }
    }

    var displayNameStyle = GetValue(style, 'displayName');
    if (!displayNameStyle) {
        displayNameStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }
    var displayNameLabelCallback = GetValue(config, 'displayNameLabel');
    if (!displayNameLabelCallback) {
        displayNameLabelCallback = function (index, item, items) {
            return { 'title': '' };  // Display nothing
        }
    }

    var createDeleteButton = function (scene) {
        return CreateDeleteButton(scene, config, style);
    }

    var createMoveUpButton = function (scene) {
        return CreateMoveUpButton(scene, config, style);
    }

    var createMoveDownButton = function (scene) {
        return CreateMoveDownButton(scene, config, style);
    }

    var backgroundStyle = GetValue(style, 'cellBackground');

    var callback = function (cell, cellContainer, gridTable) {
        var width = cell.width;
        var height = cell.height;
        var item = cell.item;
        var items = cell.items;
        var index = cell.index;

        if (cellContainer === null) {
            cellContainer = CreateCellContainer(parent, cell, {
                space,
                gridTable,
                indexStyle,
                displayNameStyle,
                createDeleteButton,
                createMoveUpButton,
                createMoveDownButton,
                backgroundStyle,
            });
        }

        cell.setCellContainerAlign('center');

        cellContainer
            .setIndexLabel(indexLabelCallback(index, item, items))
            .setDisplayNameLabel(displayNameLabelCallback(index, item, items))
            .setItem(items, index) // Also setBindingTarget
            .setSelectedState(index === gridTable.selectedIndex)
            // layout
            .setMinSize(width, 0)
            .setOrigin(0.5, 0)
            .setDirty(true)
            .layout()
            .setDirty(false)

        return cellContainer;
    }

    return callback;
}

export default GenerateCreateCellContainerCallback;
