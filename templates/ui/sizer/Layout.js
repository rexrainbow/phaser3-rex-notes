import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

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
    this.width = newWidth;
    // Get proportionLength
    if (this.orientation === 0) {
        var remainder = this.width - this.childrenWidth;
        if (remainder > 0) {
            remainder = this.width - this.getChildrenWidth(false);
            this.proportionLength = remainder / this.childrenProportion;
        } else {
            this.proportionLength = 0;
            if (remainder < 0) {
                // Layout warning
            }
        }
    }
    // Width-wrap children, top parent only
    if (isTopmostParent) {
        this.runWidthWrap(this.width);
    }

    // Calculate parent height
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    // Get proportionLength
    if (this.orientation === 1) {
        var remainder = this.height - this.childrenHeight;
        if (remainder > 0) {
            remainder = this.height - this.getChildrenHeight(false);
            this.proportionLength = remainder / this.childrenProportion;
        } else {
            this.proportionLength = 0;
            if (remainder < 0) {
                // Layout warning
            }
        }
    }

    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children    
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth;
    var innerHeight = this.innerHeight;
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
        childWidth = this.getExpandedChildWidth(child);
        childHeight = this.getExpandedChildHeight(child);
        if (child.isRexSizer) {
            child._layout(this, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (childWidth === undefined) {
            childWidth = GetDisplayWidth(child);
        }
        if (childHeight === undefined) {
            childHeight = GetDisplayHeight(child);
        }

        // Set position
        if (this.orientation === 0) { // x
            x = (itemX + padding.left);
            if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                width = childWidth;
            } else {
                width = (childConfig.proportion * this.proportionLength);
            }

            y = (itemY + padding.top);
            height = (innerHeight - padding.top - padding.bottom);
        } else { // y
            x = (itemX + padding.left);
            width = (innerWidth - padding.left - padding.right);

            y = (itemY + padding.top);
            if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                height = childHeight;
            } else {
                height = (childConfig.proportion * this.proportionLength);
            }
        }

        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildPositionState(child);

        if (this.orientation === 0) { // x
            itemX += (width + padding.left + padding.right + this.space.item);
        } else { // y
            itemY += (height + padding.top + padding.bottom + this.space.item);
        }
    }

    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;