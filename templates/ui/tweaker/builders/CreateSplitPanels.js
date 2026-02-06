import SplitPanels from '../../splitpanels/SplitPanels.js';
import CreateBackground from './CreateBackground.js';

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

    var splitterConfig = GetValue(config, 'splitter', undefined);
    var splitterStyle = GetValue(style, 'splitter', undefined);
    if (!splitterConfig && !splitterStyle) {
        // Default splitStyle
        splitterConfig = DefaultSplitStyle;
    }
    var splitter = CreateBackground(scene, splitterConfig || {}, splitterStyle || {});

    var backgroundConfig = GetValue(config, 'background', undefined);
    var backgroundStyle = GetValue(style, 'background', undefined);
    var background = CreateBackground(scene, backgroundConfig || {}, backgroundStyle || {});

    var splitPanels = new SplitPanels(scene, {
        leftPanel: leftPanel,
        rightPanel: rightPanel,
        splitter: splitter,
        background: background,

        splitRatio: GetValue(config, 'splitRatio', 0.5),
        minLeftPanelWidth: GetValue(config, 'minLeftPanelWidth', 0),
        minRightPanelWidth: GetValue(config, 'minRightPanelWidth', 0),

        space: GetValue(config, 'space', GetValue(style, 'space', undefined)),
    });
    scene.add.existing(splitPanels);

    return splitPanels;
}

export default CreateSplitPanels;
