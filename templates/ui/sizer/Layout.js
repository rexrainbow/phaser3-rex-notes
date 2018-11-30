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
            if (parent.orientation === 0) {
                expandY = true;
            } else {
                expandX = true;
            }
        }
        if (this.childrenProportion > 0) {
            if (this.orientation === 0) {
                expandX = true;
            } else {
                expandY = true;
            }
        }
    }
    if (expandX) {
        var padding = this.rexSizer.padding;
        newWidth = parent.width - padding.left - padding.right;
    } else {
        newWidth = this.childrenWidth;
    }
    if (expandY) {
        var padding = this.rexSizer.padding;
        newHeight = parent.height - padding.top - padding.bottom;
    } else {
        newHeight = this.childrenHeight;
    }
    this.resize(newWidth, newHeight);

    var remainder;
    if (isTopSizer) {
        remainder = 0;
    } else if (this.orientation === 0) {
        remainder = this.width - this.childrenWidth;
    } else {
        remainder = this.height - this.childrenHeight;
    }
    var proportionLength;
    if ((!isTopSizer) && (remainder > 0) && (this.childrenProportion > 0)) {
        if (this.orientation === 0) {
            remainder = this.width - this.getChildrenWidth(false);
        } else {
            remainder = this.height - this.getChildrenHeight(false);
        }
        proportionLength = remainder / this.childrenProportion;
    } else {
        proportionLength = 0;
    }

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
            if (childConfig.proportion === -1) {
                x = (startX + padding.left);
                width = this.width - padding.left - padding.right;
                newChildWidth = width;
            } else if (proportionLength === 0) {
                x = (itemX + padding.left);
                width = child.width;
                itemX += (width + padding.left + padding.right);
            } else {
                x = (itemX + padding.left);
                width = (childConfig.proportion * proportionLength);
                itemX += (width + padding.left + padding.right);
            }
            y = (startY + padding.top);
            height = (this.height - padding.top - padding.bottom);

            if (childConfig.expand) {
                newChildHeight = height;
            }
        } else { // y
            if (childConfig.proportion === -1) {
                y = (startY + padding.top);
                height = this.height - padding.top - padding.bottom;
                newChildHeight = height;
            } else if (proportionLength === 0) {
                y = (itemY + padding.top);
                height = child.height;
                itemY += (height + padding.top + padding.bottom);
            } else {
                y = (itemY + padding.top);
                height = (childConfig.proportion * proportionLength);
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