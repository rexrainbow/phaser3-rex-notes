import ArrayTable from '../../gameobjects/arraytable/gridtable/ArrayTable';
import CreateTitleLabel from '../utils/CreateTitleLabel';
import CreateSlider from '../CreateSlider';
import CreateAddButton from '../utils/CreateAddButton';
import CreateClearButton from '../utils/CreateClearButton';
import CreateBackground from '../utils/CreateBackground';
import Sizer from '../../../sizer/Sizer';
import GenerateCreateCellContainerCallback from './GenerateCreateCellContainerCallback';
import Merge from '../../../../../plugins/utils/object/Merge';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateArrayTable = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = tweaker.scene;

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

        if (clearButton?: any) {
            footer.add(
                clearButton,
                { proportion: 0, expand: true }
            );
        }

        footer.addSpace();

        if (addButton?: any) {
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

        createCellContainerCallback: GenerateCreateCellContainerCallback(tweaker, config, style),
    });
    scene.add.existing(arrayTable);

    return arrayTable;
}

export default CreateArrayTable;