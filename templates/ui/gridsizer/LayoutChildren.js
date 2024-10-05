import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import CheckSize from '../basesizer/utils/CheckSize.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var LayoutChildren = function () {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX,
        itemY = startY;
    var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
    var childWidth, childHeight;
    // Layout grid children
    var colWidth, rowHeight;
    var indentLeft, indentTop;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        rowHeight = this.getRowHeight(rowIndex);

        indentLeft = (rowIndex % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
        itemX = startX + (indentLeft * this.scaleX);
        for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
            colWidth = this.getColumnWidth(columnIndex);

            child = this.getChildAt(columnIndex, rowIndex);
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += colWidth + (this.space.column[columnIndex] * this.scaleX);
                continue;
            }

            PreLayoutChild.call(this, child);

            childWidth = this.getExpandedChildWidth(child, colWidth);
            childHeight = this.getExpandedChildHeight(child, rowHeight);
            if (child.isRexSizer) {
                child.runLayout(this, childWidth, childHeight);
                CheckSize(child, this);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;

            x = itemX + (padding.left * this.scaleX);
            width = colWidth - ((padding.left + padding.right) * this.scaleX);

            indentTop = (columnIndex % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
            y = itemY + (indentTop * this.scaleY) + (padding.top * this.scaleY);
            height = rowHeight - ((padding.top + padding.bottom) * this.scaleY);

            if (childWidth === undefined) {
                childWidth = GetDisplayWidth(child);
            }
            if (childHeight === undefined) {
                childHeight = GetDisplayHeight(child);
            }
            alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * childWidth)) * this.scaleX;
            alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * childHeight)) * this.scaleY;

            LayoutChild.call(this,
                child, x, y, width, height, childConfig.align,
                alignOffsetX, alignOffsetY
            );

            itemX += colWidth + (this.space.column[columnIndex] * this.scaleX);
        }

        itemY += rowHeight + (this.space.row[rowIndex] * this.scaleY);
    }
}

export default LayoutChildren;