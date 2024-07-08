import CreateScrollable from '../builders/CreateScrollable';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddScrollable = function (config) {
    var scene = this.scene;

    // Create scrollable
    var scrollableStyle = GetValue(this.styles, 'scrollable') || {};
    scrollableStyle.tweaker = this.styles;
    scrollableStyle.root = this.root;
    var scrollable = CreateScrollable(scene, config, scrollableStyle);
    delete scrollableStyle.tweaker;
    delete scrollableStyle.root;


    // Add scrollable
    this.add(
        scrollable,
        { expand: true }
    );

    // Set content
    scrollable.setTitle(config);

    var childTweaker = scrollable.childrenMap.child;

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddScrollable;