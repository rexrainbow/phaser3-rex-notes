import NOOP from '../../../plugins/utils/object/NOOP.js';
import ResizeGameObject from '../utils/ResizeGameObject.js';

const Zone = Phaser.GameObjects.Zone;
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    this.layoutInit(parent);
    var isTopSizer = (parent === undefined);

    var totalColumnProportions = this.totalColumnProportions;
    var totalRowProportions = this.totalRowProportions;

    // Set size    
    var expandX, expandY;
    if (!isTopSizer) {
        if (this.rexSizer.expand) {
            if (parent.orientation === 0) {
                expandY = true;
            } else {
                expandX = true;
            }
        }
        if (totalColumnProportions > 0) {
            expandX = true;
        }
        if (totalRowProportions > 0) {
            expandY = true;
        }
    }
    var newWidth, newHeight;
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

    // Layout grid children
    var childWidthProportion, childHeightProportion;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
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

            if (child.isRexSizer) {
                child.layout(this);
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;
            childWidthProportion = this.columnProportions[columnIndex];
            childHeightProportion = this.rowProportions[rowIndex];
            switch (childWidthProportion) {
                case 0:
                case undefined:
                    x = (itemX + padding.left);
                    width = child.width;
                    break;
                default:
                    x = (itemX + padding.left);
                    width = (childWidthProportion * proportionWidthLength);
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
                    height = (childHeightProportion * proportionHeightLength);
                    break;
            }

            tmpZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, tmpZone, childConfig.align);
            this.resetChildState(child);

            itemX += this.columnWidth[columnIndex];
        }
        itemY += this.rowHeight[rowIndex];
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