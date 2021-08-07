import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/actions/AlignIn.js';
import GetChildPrevState from '../utils/GetChildPrevState.js';
import CopyState from '../utils/CopyState.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;

    var prevChildState, layoutedChildren;
    if (this.sizerEventsEnable) {
        layoutedChildren = [];
    }

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

            if (this.sizerEventsEnable) {
                prevChildState = CopyState(child, GetChildPrevState(child));
                layoutedChildren.push(child);
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

            AlignIn(child, x, y, width, height, childConfig.align);
            if (this.sizerEventsEnable) {
                child.emit('sizer.layout', prevChildState, child, this);
            }

            this.resetChildPositionState(child);
            if (this.sizerEventsEnable) {
                child.emit('sizer.postlayout', prevChildState, child, this);
            }

            itemX += (colWidth + columnSpace[columnIndex]);
        }

        itemY += (rowHeight + rowSpace[rowIndex]);
    }

    if (this.sizerEventsEnable) {
        this.emit('postlayout', layoutedChildren, this);
    }

}

export default LayoutChildren;