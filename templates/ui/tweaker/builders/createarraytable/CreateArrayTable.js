import ArrayTable from '../../gameobjects/arraytable/gridtable/ArrayTable.js';
import CreateTitleLabel from '../CreateTitleLabel.js';
import CreateSlider from '../CreateSlider.js';
import CreateButtons from '../CreateButtons.js';
import CreateBackground from '../CreateBackground.js';
import GenerateCreateCellContainerCallback from './GenerateCreateCellContainerCallback.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import SetValue from '../../../../../plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateDefaultItem = function (properties) {
    var item = {};

    for (var i = 0, cnt = properties.length; i < cnt; i++) {
        var property = properties[i];
        var keyPath = property.$key;
        if (!keyPath) {
            continue;
        }

        if (!property.hasOwnProperty('defaultValue')) {
            continue;
        }

        var defaultValue = DeepClone(property.defaultValue);
        SetValue(item, keyPath, defaultValue);
    }

    return item;
}

var CreateArrayTable = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }
    var scene = parent.scene;

    // title
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    // table config
    var tableConfig = GetValue(config, 'table', undefined, style) || {};
    tableConfig.reuseCellContainer = true;
    tableConfig.enableLayer = true;
    tableConfig.cellHeight = 1;
    tableConfig.columns = 1;

    var properties = config['$properties'] || [];

    var addItemLabel = GetValue(config, 'addItemLabel', 'Add');

    // var onAdd = GetValue(config, 'onAdd', undefined);

    var arrayTable;

    // var createDefaultItem = GetValue(config, 'createDefaultItem', undefined);
    // if (typeof (createDefaultItem) !== 'function') {
    //     createDefaultItem = CreateDefaultItem;
    // }
    // var bindingTarget = GetValue(config, 'bindingTarget', undefined);
    // var bindingKey = GetValue(config, 'bindingKey', undefined);
    // footer, add item button
    //var footer = null;
    //if (addItemLabel !== null) {
    //    var footerConfig = {
    //        title: '',
    //        buttons: [{
    //            label: addItemLabel,
    //            callback: function () {
    //                var currentItems = (arrayTable) ? arrayTable.items : items;
    //                if (!Array.isArray(currentItems)) {
    //                    currentItems = [];
    //                }
    //
    //                var newItem = createDefaultItem(properties);
    //                currentItems.push(newItem);
    //
    //                if (bindingTarget && (bindingKey !== undefined)) {
    //                    bindingTarget[bindingKey] = currentItems;
    //                }
    //
    //                if (onAdd) {
    //                    onAdd(newItem, currentItems.length - 1);
    //                }
    //
    //                if (arrayTable) {
    //                    arrayTable.setItems(currentItems);
    //                }
    //            }
    //        }]
    //    };
    //
    //    var inputRowStyle = GetValue(style, 'inputRow', undefined);
    //    if (!inputRowStyle) {
    //        inputRowStyle = GetValue(style, 'tweaker.inputRow', {});
    //    }
    //    footer = CreateButtons(scene, footerConfig, inputRowStyle);
    //}

    // slider
    var slider = CreateSlider(scene, config.slider, style.slider);

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    arrayTable = new ArrayTable(scene, {
        table: tableConfig,

        header: title,

        //footer: footer,

        slider: slider,

        background: background,

        height: GetValue(config, 'height', 0, style),
        space: GetValue(config, 'space', undefined, style),

        createCellContainerCallback: GenerateCreateCellContainerCallback(parent, config, style),
    });
    scene.add.existing(arrayTable);

    return arrayTable;
}

export default CreateArrayTable;
