import CreateTitleLabel from './utils/CreateTitleLabel.js';
import CreateBackground from './utils/CreateBackground.js';
import SplitPanels from '../gameobjects/splitpanels/SplitPanels.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const DefaultSplitStyle = {
    width: 10,
    height: 10,
    color: 0x0,
    alpha: 0.001
};

var CreateSplitPanels = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title
    var title = CreateTitleLabel(scene, (style.title || {}));

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
