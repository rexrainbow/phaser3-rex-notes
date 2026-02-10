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

    // title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    // left and right tweaker panels with background
    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space') || {}
    }
    var leftPanel = parent.createTweaker(tweakerConfig);
    var rightPanel = parent.createTweaker(tweakerConfig);

    // splitter
    var splitterConfig = GetValue(config, 'splitter', undefined);
    var splitterStyle = GetValue(style, 'splitter', undefined);
    var splitter;
    if (!splitterConfig && !splitterStyle) {
        // Default splitStyle
        splitterConfig = DefaultSplitStyle;
    }
    splitter = CreateBackground(scene, splitterConfig || {}, splitterStyle || {});

    // background
    var backgroundStyle = GetValue(style, 'background');
    var background = CreateBackground(scene, config, backgroundStyle);

    var splitPanels = new SplitPanels(scene, {
        header: title,
        leftPanel: leftPanel,
        rightPanel: rightPanel,
        splitter: splitter,
        background: background,
        splitRatio: GetValue(config, 'splitRatio', 0.5),
        minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
        minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),
        space: GetValue(config, 'space', undefined, style),

        alignTitle: style.root.alignTitle
    });
    scene.add.existing(splitPanels);

    return splitPanels;
}

export default CreateSplitPanels;
