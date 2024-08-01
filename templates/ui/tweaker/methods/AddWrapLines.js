import CreateWrapLines from '../builders/CreateWrapLines.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddWrapLines = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create wrapLines
    var wrapLinesStyle = GetValue(this.styles, 'wrapLines') || {};
    wrapLinesStyle.tweaker = this.styles;
    wrapLinesStyle.root = this.root;
    var wrapLines = CreateWrapLines(this, config, wrapLinesStyle);
    delete wrapLinesStyle.tweaker;
    delete wrapLinesStyle.root;

    // Add wrapLines
    this.add(
        wrapLines,
        { expand: true }
    );

    // Set content
    wrapLines.setTitle(config);

    var childTweaker = wrapLines.childrenMap.child;

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddWrapLines;