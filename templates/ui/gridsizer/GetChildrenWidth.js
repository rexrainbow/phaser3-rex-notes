import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';
import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0,
        columnWidth;
    var children = this.gridChildren;
    var child, padding, childWidth, proportion;

    for (var i = 0; i < this.columnCount; i++) {
        proportion = this.columnProportions[i];
        columnWidth = 0;
        if (proportion === 0) {
            for (var j = 0; j < this.rowCount; j++) {
                child = children[(j * this.columnCount) + i];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                childWidth = (child.isRexSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    GetDisplayWidth(child);
                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right);
                columnWidth = Math.max(columnWidth, childWidth);
            }
            result += columnWidth;
        }
        this.columnWidth[i] = columnWidth;
    }
    return result + Sum(this.space.left, ...this.space.column, this.space.right);
}

export default GetChildrenWidth;