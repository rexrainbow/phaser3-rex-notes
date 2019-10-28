import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (this.rexSizer.hidden) {
        return this;
    }

    this.preLayout(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    this.resize(newWidth, newHeight);

    // Layout children
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;

    // Layout current page
    var pages = this.pages;
    for (var key in pages) {
        child = pages[key];
        childConfig = child.rexSizer;
        padding = childConfig.padding;

        // Set size
        if (child.isRexSizer) {
            child.layout(
                this,
                GetExpandedChildWidth(this, child),
                GetExpandedChildHeight(this, child));
        } else {
            childWidth = undefined;
            childHeight = undefined;
            if (childConfig.expand) { // Expand height
                childHeight = this.height - padding.top - padding.bottom;
                childWidth = this.width - padding.left - padding.right;
            }
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Set position
        x = (startX + padding.left);
        width = this.width - padding.left - padding.right;
        y = (startY + padding.top);
        height = this.height - padding.top - padding.bottom;
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildPositionState(child);
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;