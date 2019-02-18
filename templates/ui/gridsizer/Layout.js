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

    var totalColumnProportions = this.totalColumnProportions;
    var totalRowProportions = this.totalRowProportions;

    // Set size
    if (newWidth === undefined) {
        if (parent && (totalColumnProportions > 0)) {
            var padding = this.rexSizer.padding;
            newWidth = parent.width - padding.left - padding.right;
        } else {
            newWidth = Math.max(this.childrenWidth, this.minWidth);
        }
    }
    if (newHeight === undefined) {
        if (parent && (totalRowProportions > 0)) {
            var padding = this.rexSizer.padding;
            newHeight = parent.height - padding.top - padding.bottom;
        } else {
            newHeight = Math.max(this.childrenHeight, this.minHeight);
        }
    }
    this.resize(newWidth, newHeight);

    var proportionWidthLength;
    if (totalColumnProportions > 0) {
        var remainder = this.width - this.childrenWidth;
        proportionWidthLength = remainder / totalColumnProportions;
    } else {
        proportionWidthLength = 0;
    }
    var proportionHeightLength;
    if (totalRowProportions > 0) {
        var remainder = this.height - this.childrenWidth;
        proportionHeightLength = remainder / totalRowProportions;
    } else {
        proportionHeightLength = 0;
    }

    // Layout children
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var newChildWidth, newChildHeight;

    // Layout grid children
    var childWidthProportion, childHeightProportion;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        childHeightProportion = this.rowProportions[rowIndex] || 0;
        itemX = startX;
        for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
            child = this.gridChildren[(rowIndex * this.columnCount) + columnIndex];
            if (!child) {
                itemX += this.columnWidth[columnIndex];
                continue;
            }
            // Skip invisible child
            if (!child.visible) {
                itemX += this.columnWidth[columnIndex];
                continue;
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;
            newChildWidth = undefined;
            newChildHeight = undefined;
            childWidthProportion = this.columnProportions[columnIndex] || 0;

            if (child.isRexSizer) {
                child.layout(
                    this,
                    GetExpandedChildWidth(child, childWidthProportion * proportionWidthLength),
                    GetExpandedChildHeight(child, childHeightProportion * proportionHeightLength),
                );
            }

            switch (childWidthProportion) {
                case 0:
                case undefined:
                    x = (itemX + padding.left);
                    width = child.width;
                    itemX += this.columnWidth[columnIndex];
                    break;
                default:
                    x = (itemX + padding.left);
                    width = (childWidthProportion * proportionWidthLength) - padding.left - padding.right;
                    newChildWidth = width;
                    itemX += (width + padding.left + padding.right);
                    break;
            }
            switch (childHeightProportion) {
                case 0:
                case undefined:
                    y = (itemY + padding.top);
                    height = child.height;
                    break;
                default:
                    y = (itemY + padding.top);
                    height = (childHeightProportion * proportionHeightLength) - padding.top - padding.bottom;
                    newChildHeight = height;
                    break;
            }

            // Set size of child
            if (!child.isRexSizer) { // Don't resize sizer again
                ResizeGameObject(child, newChildWidth, newChildHeight);
            }

            tmpZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, tmpZone, childConfig.align);
            this.resetChildState(child);
        }

        switch (childHeightProportion) {
            case 0:
            case undefined:
                itemY += this.rowHeight[rowIndex];
                break;
            default:
                itemY += (childHeightProportion * proportionHeightLength);
                break;
        }

    }


    // Layout background children
    for (var i = 0, cnt = this.backgroundChildren.length; i < cnt; i++) {
        child = this.backgroundChildren[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeGameObject(child, width, height);
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