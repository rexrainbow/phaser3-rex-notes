import CreateScrollable from '../builders/CreateScrollable';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddScrollable = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create scrollable
    var scrollableStyle = GetValue(this.styles, 'scrollable') || {};
    scrollableStyle.tweaker = this.styles;
    scrollableStyle.root = this.root;
    var scrollable = CreateScrollable(this, config, scrollableStyle);
    delete scrollableStyle.tweaker;
    delete scrollableStyle.root;


    // Add scrollable
    this.add(
        scrollable,
        {
            proportion: (scrollable.minWidth === 0) ? 1 : 0,
            expand: true
        }
    );

    // Set content
    scrollable.setTitle(config);

    var childTweaker = scrollable.childrenMap.panel;

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddScrollable;