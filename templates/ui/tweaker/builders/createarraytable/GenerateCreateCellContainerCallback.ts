import CreateTitleLabel from '../utils/CreateTitleLabel';
import CreateDeleteButton from '../utils/CreateDeleteButton';
import CreateMoveUpButton from '../utils/CreateMoveUpButton';
import CreateMoveDownButton from '../utils/CreateMoveDownButton';
import CreateBackground from '../utils/CreateBackground';
import CellContainer from '../../gameobjects/arraytable/cellcontainer/CellContainer';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Format = PhaserUtils.String.Format;

var CreateCellContainer = function(tweaker?: any, cell?: any, config?: any) {
    var scene = tweaker.scene;

    // Create elements
    var {
        space,
        gridTable,
        indexStyle,
        createDeleteButton,
        createMoveUpButton,
        createMoveDownButton,
        tweakerConfig,
        tweakerAddRowsParameters,
        backgroundStyle,
    } = config;

    var background = CreateBackground(scene, {}, backgroundStyle);

    var indexLabel = CreateTitleLabel(scene, undefined, indexStyle);

    var deleteButton = createDeleteButton(scene);

    var moveUpButton = createMoveUpButton(scene);

    var moveDownButton = createMoveDownButton(scene);

    var properties = tweakerAddRowsParameters.properties;
    var isObjectItem = (properties.length >= 1) && (properties[0].hasOwnProperty('$key'));
    var target;
    if (isObjectItem?: any) {
        target = cell.item;
    } else {
        target = cell.items;
        properties = [{
            ...properties[0],
            title: false,     // No title label
            $key: cell.index
        }];
    }
    var inputTweaker = tweaker
        .createTweaker(tweakerConfig)
        .setAlignInputRowTitleEnable(isObjectItem)
        .addRows(properties, target, tweakerAddRowsParameters.monitor);

    // Assemble elements
    var cellContainer = new CellContainer(scene, {
        space,
        gridTable,
        background,
        indexLabel,
        inputTweaker,
        deleteButton,
        moveUpButton,
        moveDownButton,
    })
    scene.add.existing(cellContainer);

    return cellContainer;
}

var GenerateCreateCellContainerCallback = function(tweaker?: any, config?: any, style?: any) {
    if (style === undefined) {
        style = {};
    }
    // Prepare parameters
    var space = GetValue(config, 'space.cell', undefined, style) || {};

    var indexStyle = style.index;
    if (!indexStyle) {
        indexStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }
    var indexLabelCallback = GetValue(config, 'indexLabel', '%1');
    if (typeof (indexLabelCallback) === 'string') {
        var indexLabelTemplate = indexLabelCallback;
        indexLabelCallback = function(index?: any, item?: any, items?: any) {
            // %1=index, %2=total
            return { 'title': Format(indexLabelTemplate, [index, items.length]) };
        }
    }

    var createDeleteButton = function(scene?: any) {
        return CreateDeleteButton(scene, config, style);
    }

    var createMoveUpButton = function(scene?: any) {
        return CreateMoveUpButton(scene, config, style);
    }

    var createMoveDownButton = function(scene?: any) {
        return CreateMoveDownButton(scene, config, style);
    }

    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
        expandInputRowHeight: true,
    };

    var properties = GetValue(config, '$properties') || {};
    if (!Array.isArray(properties)) {
        properties = [properties];
    }
    var monitor = GetValue(config, 'monitor', false);
    var tweakerAddRowsParameters = { properties, monitor };

    var backgroundStyle = GetValue(style, 'cellBackground');

    var callback = function(cell?: any, cellContainer?: any, gridTable?: any) {
        var width = cell.width;
        var height = cell.height;
        var item = cell.item;
        var items = cell.items;
        var index = cell.index;

        if (cellContainer === null) {
            cellContainer = CreateCellContainer(tweaker, cell, {
                space,
                gridTable,
                indexStyle,
                createDeleteButton,
                createMoveUpButton,
                createMoveDownButton,
                tweakerConfig,
                tweakerAddRowsParameters,
                backgroundStyle,
            });
        }

        cell.setCellContainerAlign('center');

        cellContainer
            .setIndexLabel(indexLabelCallback(index, item, items))
            .setItem(items, index) // Also setBindingTarget
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