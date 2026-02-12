import CreateTitleLabel from '../CreateTitleLabel.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';
import CreateBackground from '../CreateBackground.js';
import CellContainer from '../../gameobjects/arraytable/cellcontainer/CellContainer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Format = Phaser.Utils.String.Format;

var CreateCellContainer = function (parent, cell, config) {
    var scene = parent.scene;

    // Create elements
    var {
        space,
        gridTable,
        indexStyle,
        deleteButtonStyle,
        deleteItemLabel,
        tweakerConfig,
        tweakerAddRowsParameters,
        backgroundStyle,
    } = config;

    var indexLabel = CreateTitleLabel(scene, undefined, indexStyle);

    var deleteButton = CreateLabel(scene, deleteButtonStyle);
    deleteButton.resetDisplayContent(deleteItemLabel);

    var inputTweaker = parent.createTweaker(tweakerConfig)
        .setAlignInputRowTitleEnable(true)
        .addRows(tweakerAddRowsParameters.properties, cell.item, tweakerAddRowsParameters.monitor);

    var background = CreateBackground(scene, {}, backgroundStyle);

    // Assemble elements
    var cellContainer = new CellContainer(scene, {
        space,
        gridTable,
        background,
        indexLabel,
        inputTweaker,
        deleteButton
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

    var deleteButtonStyle = GetValue(style, 'delete');
    if (!deleteButtonStyle) {
        deleteButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
    }
    var deleteItemLabel = GetValue(config, 'deleteLabel', 'X');

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
    };

    var properties = GetValue(config, '$properties') || [];
    var monitor = GetValue(config, 'monitor', false);
    var tweakerAddRowsParameters = { properties, monitor };

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
                deleteButtonStyle,
                deleteItemLabel,
                tweakerConfig,
                tweakerAddRowsParameters,
                backgroundStyle,
            });
        }

        cellContainer.setMinSize(width, height);

        cellContainer.setIndexLabel(indexLabelCallback(index, item, items));

        cellContainer.setItem(item); // Also setBindingTarget

        return cellContainer;
    }

    return callback;
}

export default GenerateCreateCellContainerCallback;