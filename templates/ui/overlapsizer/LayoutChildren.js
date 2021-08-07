import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/actions/AlignIn.js';
import GetChildPrevState from '../utils/GetChildPrevState.js';
import CopyState from '../utils/CopyState.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;

    var prevChildState, layoutedChildren;
    if (this.sizerEventsEnable) {
        layoutedChildren = [];
    }

    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
        child = children[key];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        if (this.sizerEventsEnable) {
            prevChildState = CopyState(child, GetChildPrevState(child));
            layoutedChildren.push(child);
        }

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
        if (this.sizerEventsEnable) {
            child.emit('sizer.layout', prevChildState, child, this);
        }

        this.resetChildPositionState(child);
        if (this.sizerEventsEnable) {
            child.emit('sizer.postlayout', prevChildState, child, this);
        }
    }

    if (this.sizerEventsEnable) {
        this.emit('postlayout', layoutedChildren, this);
    }

}

export default LayoutChildren;