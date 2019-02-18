import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';
import ResizeGameObject from '../utils/ResizeGameObject.js';

const Zone = Phaser.GameObjects.Zone;
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    this.layoutInit(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
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

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        // Set size
        if (child.isRexSizer) {
            child.layout(
                this,
                GetExpandedChildWidth(this, child),
                GetExpandedChildHeight(this, child));
        } else {
            newChildWidth = undefined;
            newChildHeight = undefined;
            if (childConfig.proportion === -1) { // Background
                newChildWidth = this.width - padding.left - padding.right;
                newChildHeight = this.height - padding.top - padding.bottom;
            } else if (childConfig.expand && (this.orientation === 0)) { // x, expand height
                newChildHeight = this.height - padding.top - padding.bottom;
            } else if (childConfig.expand && (this.orientation === 1)) { // y, expand width
                newChildWidth = this.width - padding.left - padding.right;
            }
            ResizeGameObject(child, newChildWidth, newChildHeight);
        }

        // Set position
        if (childConfig.proportion === -1) { // Background
            x = (startX + padding.left);
            y = (startY + padding.top);
            width = this.width - padding.left - padding.right;
            height = this.height - padding.top - padding.bottom;
        } else if (this.orientation === 0) { // x
            if (
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
            y = (itemY + padding.top);
            height = (this.height - padding.top - padding.bottom);
        } else { // y
            if (
                (childConfig.proportion === 0) ||
                (proportionLength === 0)
            ) {
                y = (itemY + padding.top);
                height = child.height;
                itemY += (height + padding.top + padding.bottom);
            } else {
                y = (itemY + padding.top);
                height = (childConfig.proportion * proportionLength) - padding.top - padding.bottom;
                itemY += (height + padding.top + padding.bottom);
            }
            x = (itemX + padding.left);
            width = (this.width - padding.left - padding.right);
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