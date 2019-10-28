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

    var proportionLength;
    if (this.childrenProportion > 0) {
        var remainder = (this.orientation === 0) ?
            (this.width - this.childrenWidth) :
            (this.height - this.childrenHeight);

        if (remainder > 0) {
            remainder = (this.orientation === 0) ?
                (this.width - this.getChildrenWidth(false)) :
                (this.height - this.getChildrenHeight(false));
            proportionLength = remainder / this.childrenProportion;
        } else {
            proportionLength = 0;
        }
    } else {
        proportionLength = 0;
    }
    this.proportionLength = proportionLength;

    // Layout children    
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        // Set size
        childWidth = GetExpandedChildWidth(this, child);
        childHeight = GetExpandedChildHeight(this, child);
        if (child.isRexSizer) {
            child.layout(this, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (childWidth === undefined) {
            childWidth = child.displayWidth;
        }
        if (childHeight === undefined) {
            childHeight = child.displayHeight;
        }

        // Set position
        if (this.orientation === 0) { // x
            x = (itemX + padding.left);
            if ((childConfig.proportion === 0) || (proportionLength === 0)) {
                width = childWidth;
            } else {
                width = (childConfig.proportion * proportionLength);
            }

            y = (itemY + padding.top);
            height = (this.height - padding.top - padding.bottom);
        } else { // y
            x = (itemX + padding.left);
            width = (this.width - padding.left - padding.right);

            y = (itemY + padding.top);
            if ((childConfig.proportion === 0) || (proportionLength === 0)) {
                height = childHeight;
            } else {
                height = (childConfig.proportion * proportionLength);
            }
        }

        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildPositionState(child);

        if (this.orientation === 0) { // x
            itemX += (width + padding.left + padding.right);
        } else { // y
            itemY += (height + padding.top + padding.bottom);
        }
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;