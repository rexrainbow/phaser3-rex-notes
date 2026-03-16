import CreateWrap from '../builders/CreateWrap.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddWrap = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create wrap
    var wrapStyle = GetValue(this.styles, 'wrap') || {};
    var wrap = CreateWrap(this, config, wrapStyle);

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