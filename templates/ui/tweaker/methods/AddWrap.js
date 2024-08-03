import CreateWrap from '../builders/CreateWrap.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddWrap = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create wrap
    var wrapLinesStyle = GetValue(this.styles, 'wrap') || {};
    wrapLinesStyle.tweaker = this.styles;
    wrapLinesStyle.root = this.root;
    var wrap = CreateWrap(this, config, wrapLinesStyle);
    delete wrapLinesStyle.tweaker;
    delete wrapLinesStyle.root;

    // Add wrap
    this.add(
        wrap,
        { expand: true }
    );

    // Set content
    wrap.setTitle(config);

    var childTweaker = wrap.childrenMap.child;

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddWrap;