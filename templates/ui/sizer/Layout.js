import NOOP from '../../../plugins/utils/object/NOOP.js';
import ResizeGameObject from '../utils/ResizeGameObject.js';

const Zone = Phaser.GameObjects.Zone;
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    var isTopSizer = (parent === undefined);
    // Clear childrenWidth/childrenHeight/childrenProportion of all sizers
    if (isTopSizer) {
        var children = this.getAllChildrenSizer([this]),
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            child._childrenWidth = undefined;
            child._childrenHeight = undefined;
            child._childrenProportion = undefined;
        }
    }

    // Set size
    var newWidth, newHeight;
    var expandX, expandY;
    if (!isTopSizer) {
        if (this.rexSizer.expand) {
            if (parent.orientation === 0) { // x
                expandY = 1;
            } else { // y
                expandX = 1;
            }
        }
        if (this.rexSizer.proportion > 0) {
            if (parent.orientation === 0) { // x
                expandX = 2;
            } else { // y
                expandY = 2;
            }
        }
    }
    switch (expandX) {
        case 1: // rexSizer.expand
            var padding = this.rexSizer.padding;
            newWidth = parent.width - padding.left - padding.right;
            break;
        case 2: // rexSizer.proportion > 0
            var padding = this.rexSizer.padding;
            newWidth = (this.rexSizer.proportion * parent.proportionLength) - padding.left - padding.right;
            break;
        default:
            newWidth = Math.max(this.childrenWidth, this.minWidth);
            break;
    }
    switch (expandY) {
        case 1: // rexSizer.expand
            var padding = this.rexSizer.padding;
            newHeight = parent.height - padding.top - padding.bottom;
            break;
        case 2: // rexSizer.proportion > 0
            var padding = this.rexSizer.padding;
            newHeight = (this.rexSizer.proportion * parent.proportionLength) - padding.top - padding.bottom;
            break;
        default:
            newHeight = Math.max(this.childrenHeight, this.minHeight);
            break;
    }
    this.resize(newWidth, newHeight);

    var remainder;
    if (this.orientation === 0) {
        remainder = this.width - this.childrenWidth;
    } else {
        remainder = this.height - this.childrenHeight;
    }
    var proportionLength;
    if ((remainder > 0) && (this.childrenProportion > 0)) {
        if (this.orientation === 0) {
            remainder = this.width - this.getChildrenWidth(false);
        } else {
            remainder = this.height - this.getChildrenHeight(false);
        }
        proportionLength = remainder / this.childrenProportion;
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
    var newChildWidth, newChildHeight;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }

        if (child.isRexSizer) {
            child.layout(this);
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;
        newChildWidth = undefined;
        newChildHeight = undefined;
        if (this.orientation === 0) { // x
            if (childConfig.proportion === -1) { // Background
                x = (startX + padding.left);
                width = this.width - padding.left - padding.right; // Expand width of child
                newChildWidth = width;
            } else if (
                (childConfig.proportion === 0) ||
                (proportionLength === 0)
            ) {
                x = (itemX + padding.left);
                width = child.width;
                itemX += (width + padding.left + padding.right);
            } else {
                x = (itemX + padding.left);
                width = (childConfig.proportion * proportionLength) - padding.left - padding.right;
                itemX += (width + padding.left + padding.right);
            }
            y = (startY + padding.top);
            height = (this.height - padding.top - padding.bottom);

            if (childConfig.expand) {
                newChildHeight = height;
            }
        } else { // y
            if (childConfig.proportion === -1) { // Background
                y = (startY + padding.top);
                height = this.height - padding.top - padding.bottom;
                newChildHeight = height;
            } else if (proportionLength === 0) {
                y = (itemY + padding.top);
                height = child.height;
                itemY += (height + padding.top + padding.bottom);
            } else {
                y = (itemY + padding.top);
                height = (childConfig.proportion * proportionLength) - padding.top - padding.bottom;
                itemY += (height + padding.top + padding.bottom);
            }
            x = (startX + padding.left);
            width = (this.width - padding.left - padding.right);

            if (childConfig.expand) {
                newChildWidth = width;
            }
        }

        // Set size of child
        if (!child.isRexSizer) { // Don't resize sizer again
            ResizeGameObject(child, newChildWidth, newChildHeight);
        }

        tmpZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, tmpZone, childConfig.align);
        this.resetChildState(child);
    }
    return this;
}

var tmpZone = new Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
tmpZone.setOrigin(0);

export default Layout;