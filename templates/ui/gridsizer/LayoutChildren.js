import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

var LayoutChildren = function () {
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
                child.runLayout(this, childWidth, childHeight);
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
}

export default LayoutChildren;