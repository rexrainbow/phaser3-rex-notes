import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenHeight = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0,
        rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;
    var hasUnknownChildHeight = false;
    var totalRowProportions = this.totalRowProportions;  // To update this.hasColumnProportion0Child member

    for (var i = 0; i < this.rowCount; i++) {
        proportion = this.rowProportions[i];
        rowHeight = 0;
        if ((proportion === 0) || minimumMode) {
            for (var j = 0; j < this.columnCount; j++) {
                child = children[(i * this.columnCount) + j];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                childHeight = this.getChildHeight(child);
                if (childHeight === undefined) {
                    if ((proportion !== 0) && (!this.hasRowProportion0Child)) {
                        childHeight = 0;
                    } else {
                        hasUnknownChildHeight = true;
                    }
                }

                if (hasUnknownChildHeight) {
                    continue;
                }

                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom) * this.scaleY;
                rowHeight = Math.max(rowHeight, childHeight);
            }

            if (!hasUnknownChildHeight) {
                result += rowHeight;
            }

        }
        // else,(proportion > 0) : rowHeight is 0

        if (!hasUnknownChildHeight) {
            if (minimumMode) {
                this.rowHeight[i] = rowHeight;
            }
        }

    }

    if (hasUnknownChildHeight) {
        return undefined;
    }

    var indentTop = Math.max(this.space.indentTopOdd, this.space.indentTopEven);
    var totalSpace = Sum(this.space.top, indentTop, ...this.space.row, this.space.bottom);
    return result + (totalSpace * this.scaleY);
}

export default GetChildrenHeight;