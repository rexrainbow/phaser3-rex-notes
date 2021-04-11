import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    var isTopmostParent = !parent;
    // Preprocessor, top parent only
    if (isTopmostParent) {
        this.preLayout();
    }

    // Calculate parent width
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    // Width-wrap children, top parent only
    if (isTopmostParent) {
        this.width = newWidth;
        this.runWidthWrap(newWidth);
    }

    // Calculate parent height
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }

    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;

    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
        child = children[key];
        childConfig = child.rexSizer;
        padding = childConfig.padding;

        // Set size
        if (child.isRexSizer) {
            child._layout(
                this,
                this.getExpandedChildWidth(child),
                this.getExpandedChildHeight(child));
        } else {
            childWidth = undefined;
            childHeight = undefined;
            if (childConfig.expandWidth) { // Expand width
                childWidth = innerWidth - padding.left - padding.right;
            }
            if (childConfig.expandHeight) { // Expand height
                childHeight = innerHeight - padding.top - padding.bottom;
            }
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Set position
        x = (startX + padding.left);
        width = innerWidth - padding.left - padding.right;
        y = (startY + padding.top);
        height = innerHeight - padding.top - padding.bottom;
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildPositionState(child);
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;