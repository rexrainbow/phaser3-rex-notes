import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/actions/AlignIn.js';
import CopyState from '../utils/CopyState.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var prevChildState;
    var childWidth, childHeight;

    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
        child = children[key];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        prevChildState = CopyState(child, true);

        // Set size
        if (child.isRexSizer) {
            child.runLayout(
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

        AlignIn(child, x, y, width, height, childConfig.align);
        child.emit('layout', prevChildState, child, this);

        this.resetChildPositionState(child);
        child.emit('postlayout', prevChildState, child, this);
    }
}

export default LayoutChildren;