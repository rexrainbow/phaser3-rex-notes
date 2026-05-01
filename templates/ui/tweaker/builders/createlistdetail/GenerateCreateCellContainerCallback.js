import { GetIndexLabelStyle, GetIndexLabelCallback, CreateIndexLabel } from './IndexLabelMethods.js';
import { GetDisplayNameStyle, GetDisplayNameLabelCallback, CreateDisplayNameLabel } from './DisplayNameLabelMethods.js';
import CreateDeleteButton from '../utils/CreateDeleteButton.js';
import CreateMoveUpButton from '../utils/CreateMoveUpButton.js';
import CreateMoveDownButton from '../utils/CreateMoveDownButton.js';
import CreateBackground from '../utils/CreateBackground.js';
import CellContainer from '../../gameobjects/listdetail/cellcontainer/CellContainer.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;


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

    var background = CreateBackground(scene, {}, backgroundStyle);

    var indexLabel = CreateIndexLabel(scene, indexStyle);

    var displayNameLabel = CreateDisplayNameLabel(scene, displayNameStyle);

    var deleteButton = createDeleteButton(scene);

    var moveUpButton = createMoveUpButton(scene);

    var moveDownButton = createMoveDownButton(scene);

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

    var indexStyle = GetIndexLabelStyle(style);
    var indexLabelCallback = GetIndexLabelCallback(config);

    var displayNameStyle = GetDisplayNameStyle(style);
    var displayNameLabelCallback = GetDisplayNameLabelCallback(config);

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
