import ArrayTable from '../../gameobjects/arraytable/gridtable/ArrayTable.js';
import CreateTitleLabel from '../utils/CreateTitleLabel.js';
import CreateSlider from '../CreateSlider.js';
import CreateAddButton from '../utils/CreateAddButton.js';
import CreateClearButton from '../utils/CreateClearButton.js';
import CreateBackground from '../utils/CreateBackground.js';
import Sizer from '../../../sizer/Sizer.js';
import GenerateCreateCellContainerCallback from './GenerateCreateCellContainerCallback.js';
import Merge from '../../../../../plugins/utils/object/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateArrayTable = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    // table config
    var tableConfig = GetValue(config, 'table', undefined, style) || {};

    // slider
    var slider = CreateSlider(scene, config.slider, style.slider);

    var footer;
    var clearButton = CreateClearButton(scene, config, style);
    var addButton = CreateAddButton(scene, config, style);
    if (clearButton || addButton) {
        footer = new Sizer(scene, {
            space: {
                item: GetValue(config, 'space.button', 0, style)
            }
        });
        scene.add.existing(footer);

        if (clearButton) {
            footer.add(
                clearButton,
                { proportion: 0, expand: true }
            );
        }

        footer.addSpace();

        if (addButton) {
            footer.add(
                addButton,
                { proportion: 0, expand: true }
            );
        }
    }

    var arrayTable = new ArrayTable(scene, {
        table: tableConfig,
        clampChildOY: true,

        header: title,

        footer: footer,
        clearButton: clearButton,
        addButton: addButton,

        slider: slider,

        background: background,

        height: GetValue(config, 'height', 0, style),
        space: Merge((config.space || {}), (style.space || {})),

        createCellContainerCallback: GenerateCreateCellContainerCallback(parent, config, style),
    });
    scene.add.existing(arrayTable);

    return arrayTable;
}

export default CreateArrayTable;
