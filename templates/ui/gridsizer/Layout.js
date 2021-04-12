import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

var Layout = function (parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.rexSizer.hidden || (!this.dirty)) {
        return this;
    }

    if (!parent) {
        this.preLayout();
    }

    // Calculate parent width
    newWidth = this.resolveWidth(parent, newWidth);
    // Calculate parent height
    newHeight = this.resolveHeight(parent, newHeight);
    // Resize parent
    this.resize(newWidth, newHeight);

    // Layout children
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    // Layout grid children
    var columnSpace = this.space.column;
    var rowSpace = this.space.row;
    var colWidth, rowHeight;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        rowHeight = this.getRowHeight(rowIndex);

        itemX = startX;
        for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
            colWidth = this.getColumnWidth(columnIndex);

            child = this.getChildAt(columnIndex, rowIndex);
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += (colWidth + columnSpace[columnIndex]);
                continue;
            }

            childWidth = this.getExpandedChildWidth(child, colWidth);
            childHeight = this.getExpandedChildHeight(child, rowHeight);
            if (child.isRexSizer) {
                child._layout(this, childWidth, childHeight);
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

            itemX += (colWidth + columnSpace[columnIndex]);
        }

        itemY += (rowHeight + rowSpace[rowIndex]);
    }


    // Layout background children
    this.layoutBackgrounds();

    return this.postLayout();
}

export default Layout;