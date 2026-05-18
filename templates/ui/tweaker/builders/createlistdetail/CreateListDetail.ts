import ListDetail from '../../gameobjects/listdetail/ListDetail';
import GenerateCreateCellContainerCallback from './GenerateCreateCellContainerCallback';
import { GetIndexLabelStyle, GetIndexLabelCallback, CreateIndexLabel } from './IndexLabelMethods';
import { GetDisplayNameStyle, GetDisplayNameLabelCallback, CreateDisplayNameLabel } from './DisplayNameLabelMethods';
import CreateTitleLabel from '../utils/CreateTitleLabel';
import CreateSlider from '../CreateSlider';
import CreateAddButton from '../utils/CreateAddButton';
import CreateClearButton from '../utils/CreateClearButton';
import CreateDeleteButton from '../utils/CreateDeleteButton';
import CreateDuplicateButton from '../utils/CreateDuplicateButton';
import CreateResetButton from '../utils/CreateResetButton';
import CreatePreviousButton from '../utils/CreatePreviousButton';
import CreateNextButton from '../utils/CreateNextButton';
import CreateBackground from '../utils/CreateBackground';
import Sizer from '../../../sizer/Sizer';
import Merge from '../../../../../plugins/utils/object/Merge';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

const DefaultSplitStyle = {
    width: 10,
    height: 10,
    color: 0x0,
    alpha: 0.001
};

var CreateListDetail = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }
    var scene = tweaker.scene;

    // background of split-panels
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title of split-panels
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    // left panel of split-panels
    // table config
    var listTableConfig = GetValue(config, 'table', undefined, style) || {};
    var createCellContainerCallback = GenerateCreateCellContainerCallback(tweaker, config, style);

    // slider
    var listTableSlider = CreateSlider(scene, config.slider, style.slider);

    // footer
    var listTableFooter;
    var clearButton = CreateClearButton(scene, config, style);
    var addButton = CreateAddButton(scene, config, style);
    if (clearButton || addButton) {
        listTableFooter = new Sizer(scene, {
            space: {
                item: GetValue(config, 'space.button', 0, style)
            }
        });
        scene.add.existing(listTableFooter);

        if (clearButton?: any) {
            listTableFooter.add(
                clearButton,
                { proportion: 0, expand: true }
            );
        }

        listTableFooter.addSpace();

        if (addButton?: any) {
            listTableFooter.add(
                addButton,
                { proportion: 0, expand: true }
            );
        }
    }
    // left panel of split-panels

    // right panel of split-panels
    var editor = tweaker
        .createTweaker({
            root: tweaker.root,
            styles: tweaker.styles,
        })
        .addRows(config.$properties, GetValue(config, 'monitor', false));
    // slider
    var editorSlider = CreateSlider(scene, config.slider, style.slider);

    var indexLabelCallback = GetIndexLabelCallback(config);
    var displayNameLabelCallback = GetDisplayNameLabelCallback(config);

    // toolbar buttons at editor footer
    var editorToolbarStyle = GetValue(style, 'editorToolbar') || {};

    var editorIndexLabelStyle = GetValue(editorToolbarStyle, 'index');
    if (!editorIndexLabelStyle) {
        editorIndexLabelStyle = GetIndexLabelStyle(style);
    }
    var editorIndexLabel = CreateIndexLabel(scene, editorIndexLabelStyle);

    var editorDisplayNameStyle = GetValue(editorToolbarStyle, 'displayName');
    if (!editorDisplayNameStyle) {
        editorDisplayNameStyle = GetDisplayNameStyle(style);
    }
    var editorDisplayNameLabel = CreateDisplayNameLabel(scene, editorDisplayNameStyle);

    var editorDeleteButton = CreateDeleteButton(scene, config, editorToolbarStyle);
    var editorDuplicateButton = CreateDuplicateButton(scene, config, editorToolbarStyle);
    var editorResetButton = CreateResetButton(scene, config, editorToolbarStyle);
    var editorPreviousButton = CreatePreviousButton(scene, config, editorToolbarStyle);
    var editorNextButton = CreateNextButton(scene, config, editorToolbarStyle);
    var createDefaultItemCallback = GetValue(config, 'createDefaultItem');
    if (editorDuplicateButton?: any) {
        editorDuplicateButton.createDefaultItem = createDefaultItemCallback;
    }
    if (editorResetButton?: any) {
        editorResetButton.createDefaultItem = createDefaultItemCallback;
    }
    // right panel of split-panels

    // splitter
    var splitterConfig = config.splitter;
    var splitterStyle = style.splitter;
    if (!splitterConfig && !splitterStyle) {
        splitterStyle = DefaultSplitStyle;
    }
    var splitter = CreateBackground(scene, (splitterConfig || {}), (splitterStyle || {}));

    var listDetail = new ListDetail(scene, {
        isHorizontalView: (config.view === 'detail-h'),

        header: title,

        // ListTable at left panel
        listTableConfig: listTableConfig,
        createListCellContainerCallback: createCellContainerCallback,
        listTableSlider: listTableSlider,
        listTableFooter: listTableFooter,
        clearButton: clearButton,
        addButton: addButton,

        // Editor at right panel
        editor: editor,
        editorSlider: editorSlider,
        // Title (header)
        editorIndexLabel: editorIndexLabel,
        editorDisplayNameLabel: editorDisplayNameLabel,
        indexLabelCallback: indexLabelCallback,
        displayNameLabelCallback: displayNameLabelCallback,
        // Toolbar (footer)
        editorDeleteButton: editorDeleteButton,
        editorDuplicateButton: editorDuplicateButton,
        editorResetButton: editorResetButton,
        editorPreviousButton: editorPreviousButton,
        editorNextButton: editorNextButton,

        // Splitter between left and right panel
        splitter: splitter,
        splitRatio: GetValue(config, 'splitRatio', 0.5),

        minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
        minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),
        minTopPanelWidth: GetValue(config, 'minTopPanelWidth', 0),
        minBottomPanelWidth: GetValue(config, 'minBottomPanelWidth', 0),

        // background of panels
        background: background,

        height: GetValue(config, 'height', 0, style),
        space: Merge((config.space || {}), (style.space || {})),

        alignTitle: GetValue(style, 'root.alignTitle')
    });
    scene.add.existing(listDetail);

    return listDetail;
}

export default CreateListDetail;