import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';
import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0,
        rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;

    for (var i = 0; i < this.rowCount; i++) {
        proportion = this.rowProportions[i];
        rowHeight = 0;
        if (proportion === 0) {
            for (var j = 0; j < this.columnCount; j++) {
                child = children[(i * this.columnCount) + j];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                childHeight = (child.isRexSizer) ?
                    Math.max(child.minHeight, child.childrenHeight) :
                    (child.hasOwnProperty('minHeight')) ? child.minHeight : GetDisplayHeight(child);
                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom);
                rowHeight = Math.max(rowHeight, childHeight);
            }
            result += rowHeight;
        }
        this.rowHeight[i] = rowHeight;
    }
    return result + Sum(this.space.top, ...this.space.row, this.space.bottom);
}

export default GetChildrenHeight;