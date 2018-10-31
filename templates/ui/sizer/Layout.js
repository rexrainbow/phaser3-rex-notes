import NOOP from 'rexPlugins/utils/object/NOOP.js';

const Zone = Phaser.GameObjects.Zone;
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    // Clear childrenWidth/childrenHeight/childrenProportion of all sizers
    if (parent === undefined) {
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
    var childrenProportion = this.childrenProportion;
    var newWidth, newHeight;
    var expandX, expandY;
    if (parent) {
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

    var proportionLength;
    if ((childrenProportion > 0) && (parent !== undefined)) {
        var remainder;
        if (this.orientation === 0) {
            remainder = this.width - this.childrenWidth;
        } else {
            remainder = this.height - this.childrenHeight;
        }
        proportionLength = remainder / childrenProportion;
    } else {
        proportionLength = 0;
    }

    // Layout children    
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.x - (this.displayWidth * this.originX),
        startY = this.y - (this.displayHeight * this.originY);
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

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        if (child.isRexSizer) {
            child.layout(this);
        }

        newChildWidth = undefined;
        newChildHeight = undefined;
        if (this.orientation === 0) { // x
            switch (childConfig.proportion) {
                case 0:
                    x = (itemX + padding.left);
                    width = child.width;
                    itemX += (width + padding.left + padding.right);
                    break;
                case -1:
                    x = (startX + padding.left);
                    width = this.width - padding.left - padding.right;
                    newChildWidth = width;
                    break;
                default:
                    x = (itemX + padding.left);
                    width = (childConfig.proportion * proportionLength);
                    itemX += (width + padding.left + padding.right);
                    break;
            }
            y = (startY + padding.top);
            height = (this.height - padding.top - padding.bottom);

            if (childConfig.expand) {
                newChildHeight = height;
            }
        } else { // y
            switch (childConfig.proportion) {
                case 0:
                    y = (itemY + padding.top);
                    height = child.height;
                    itemY += (height + padding.top + padding.bottom);
                    break;
                case -1:
                    y = (startY + padding.top);
                    height = this.height - padding.top - padding.bottom;
                    newChildHeight = height;
                    break;
                default:
                    y = (itemY + padding.top);
                    height = (childConfig.proportion * proportionLength);
                    itemY += (height + padding.top + padding.bottom);
                    break;
            }
            x = (startX + padding.left);
            width = (this.width - padding.left - padding.right);

            if (childConfig.expand) {
                newChildWidth = width;
            }
        }

        // Set size of child
        if ((newChildWidth !== undefined) || (newChildHeight !== undefined)) {
            if (child.isRexSizer) {
                // Don't resize again
            } else if (child.resize) { // Has `resize` method
                if (newChildWidth === undefined) {
                    newChildWidth = child.width;
                }
                if (newChildHeight === undefined) {
                    newChildHeight = child.height;
                }
                child.resize(newChildWidth, newChildHeight);
            } else { // Set display width/height
                if (newChildWidth !== undefined) {
                    child.displayWidth = newChildWidth;
                }
                if (newChildHeight !== undefined) {
                    child.displayHeight = newChildHeight;
                }
            }
        }

        tmpZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, tmpZone, childConfig.align);
        this.resetChildState(child)
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