import ArrayTable from '../../gameobjects/arraytable/gridtable/ArrayTable.js';
import CreateTitleLabel from '../CreateTitleLabel.js';
import CreateSlider from '../CreateSlider.js';
import CreateAddButton from './CreateAddButton.js';
import CreateBackground from '../CreateBackground.js';
import Sizer from '../../../sizer/Sizer.js';
import GenerateCreateCellContainerCallback from './GenerateCreateCellContainerCallback.js';
import Merge from '../../../../../plugins/utils/object/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

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

    // slider
    var slider = CreateSlider(scene, config.slider, style.slider);

    var addButton = CreateAddButton(scene, config, style);
    var footer = new Sizer(scene);
    scene.add.existing(footer);
    footer
        .addSpace()
        .add(
            addButton,
            { proportion: 0, expand: true }
        )

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    var arrayTable = new ArrayTable(scene, {
        table: tableConfig,

        header: title,

        footer: footer,
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
