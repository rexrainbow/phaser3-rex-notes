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

    var totalColumnProportions = this.totalColumnProportions;
    var totalRowProportions = this.totalRowProportions;

    // Set size
    if (newWidth === undefined) {
        if (parent && (totalColumnProportions > 0)) { // Expand to parent width
            var padding = this.rexSizer.padding;
            newWidth = parent.width - padding.left - padding.right;
        } else {
            newWidth = Math.max(this.childrenWidth, this.minWidth);
        }
    }
    if (newHeight === undefined) {
        if (parent && (totalRowProportions > 0)) { // Expand to parent height
            var padding = this.rexSizer.padding;
            newHeight = parent.height - padding.top - padding.bottom;
        } else {
            newHeight = Math.max(this.childrenHeight, this.minHeight);
        }
    }
    this.resize(newWidth, newHeight);

    var proportionWidthLength;
    if (totalColumnProportions > 0) {
        proportionWidthLength = (this.width - this.childrenWidth) / totalColumnProportions;
    } else {
        proportionWidthLength = 0;
    }
    var proportionHeightLength;
    if (totalRowProportions > 0) {
        proportionHeightLength = (this.height - this.childrenHeight) / totalRowProportions;
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
    var childWidth, childHeight;
    // Layout grid children
    var colProportion, rowProportion,
        colWidth, rowHeight;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        rowProportion = this.rowProportions[rowIndex] || 0;
        rowHeight = (rowProportion === 0) ? this.rowHeight[rowIndex] : (rowProportion * proportionHeightLength);

        itemX = startX;
        for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
            colProportion = this.columnProportions[columnIndex] || 0;
            colWidth = (colProportion === 0) ? this.columnWidth[columnIndex] : (colProportion * proportionWidthLength);

            child = this.gridChildren[(rowIndex * this.columnCount) + columnIndex];
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += colWidth;
                continue;
            }

            childWidth = GetExpandedChildWidth(child, colWidth);
            childHeight = GetExpandedChildHeight(child, rowHeight);
            if (child.isRexSizer) {
                child.layout(this, childWidth, childHeight);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;
            x = (itemX + padding.left);
            width = colWidth - padding.left - padding.right;
            y = (itemY + padding.top);
            height = rowHeight - padding.top - padding.bottom;

            GlobZone.setPosition(x, y).setSize(width, height);
            AlignIn(child, GlobZone, childConfig.align);
            this.resetChildPositionState(child);

            itemX += colWidth;
        }

        itemY += rowHeight;
    }


    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;