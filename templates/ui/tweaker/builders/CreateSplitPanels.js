import CreateBackground from './CreateBackground.js';
import SplitPanels from '../gameobjects/splitpanels/SplitPanels.js';
import Title from '../gameobjects/label/Title.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const DefaultSplitStyle = {
    width: 8,
    height: 8,
    color: 0x0,
    alpha: 0.001
};

var CreateSplitPanels = function (parent, config, style) {
    var scene = parent.scene;

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space') || {}
    }

    var leftPanel = parent.createTweaker(tweakerConfig);
    var rightPanel = parent.createTweaker(tweakerConfig);

    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var splitterConfig = GetValue(config, 'splitter', undefined);
    var splitterStyle = GetValue(style, 'splitter', undefined);
    var splitter;
    if (!splitterConfig && !splitterStyle) {
        // Default splitStyle
        splitterConfig = DefaultSplitStyle;
    }
    splitter = CreateBackground(scene, splitterConfig || {}, splitterStyle || {});

    var backgroundConfig = GetValue(config, 'background', undefined);
    var backgroundStyle = GetValue(style, 'background', undefined);
    var background = CreateBackground(scene, backgroundConfig || {}, backgroundStyle || {});

    var space = GetValue(config, 'space', undefined);
    if (space === undefined) {
        space = GetValue(style, 'space', undefined);
    }

    var alignAllColumnsTitleWidth = GetValue(config, 'alignAllColumnsTitleWidth', undefined);
    if (alignAllColumnsTitleWidth === undefined) {
        alignAllColumnsTitleWidth = GetValue(style, 'alignAllColumnsTitleWidth', false);
    }

    var splitPanels = new SplitPanels(scene, {
        header: title,
        background: background,
        leftPanel: leftPanel,
        rightPanel: rightPanel,
        splitter: splitter,
        splitRatio: GetValue(config, 'splitRatio', 0.5),
        minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
        minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),

        space: space,
        alignAllColumnsTitleWidth: alignAllColumnsTitleWidth
    });
    scene.add.existing(splitPanels);

    return splitPanels;
}

export default CreateSplitPanels;
