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
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // title
    var title = new Title(scene, (style.title || {}));
    scene.add.existing(title);

    // left and right tweaker panels with background
    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
    }
    var leftPanel = parent.createTweaker(tweakerConfig);
    var rightPanel = parent.createTweaker(tweakerConfig);

    // splitter
    var splitterConfig = config.splitter;
    var splitterStyle = style.splitter;
    var splitter;
    if (!splitterConfig && !splitterStyle) {
        // Default splitStyle
        splitterStyle = DefaultSplitStyle;
    }
    splitter = CreateBackground(scene, (splitterConfig || {}), (splitterStyle || {}));

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    var splitPanels = new SplitPanels(scene, {
        header: title,
        leftPanel: leftPanel,
        rightPanel: rightPanel,
        splitter: splitter,
        background: background,
        splitRatio: GetValue(config, 'splitRatio', 0.5),
        minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
        minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),
        space: style.space,

        alignTitle: style.root.alignTitle
    });
    scene.add.existing(splitPanels);

    return splitPanels;
}

export default CreateSplitPanels;
