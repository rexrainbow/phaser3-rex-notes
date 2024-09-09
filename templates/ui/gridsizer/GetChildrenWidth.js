import Sum from '../../../plugins/utils/math/Sum.js';

var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0,
        columnWidth;
    var children = this.sizerChildren;
    var child, padding, childWidth, proportion;
    var hasUnknownChildWidth = false;
    var totalColumnProportions = this.totalColumnProportions;  // To update this.hasColumnProportion0Child member

    for (var i = 0; i < this.columnCount; i++) {
        proportion = this.columnProportions[i];
        columnWidth = 0;
        if ((proportion === 0) || minimumMode) {
            for (var j = 0; j < this.rowCount; j++) {
                child = children[(j * this.columnCount) + i];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                childWidth = this.getChildWidth(child);
                if (childWidth === undefined) {
                    if ((proportion !== 0) && (!this.hasColumnProportion0Child)) {
                        childWidth = 0;
                    } else {
                        hasUnknownChildWidth = true;
                    }
                }

                if (hasUnknownChildWidth) {
                    continue;
                }

                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right) * this.scaleX;
                columnWidth = Math.max(columnWidth, childWidth);
            }

            if (!hasUnknownChildWidth) {
                result += columnWidth;
            }

        }

        // else,(proportion > 0) : columnWidth is 0
        if (!hasUnknownChildWidth) {
            if (minimumMode) {
                this.columnWidth[i] = columnWidth;
            }
        }
    }

    if (hasUnknownChildWidth) {
        return undefined;
    }

    var indentLeft = Math.max(this.space.indentLeftOdd, this.space.indentLeftEven);
    var totalSpace = Sum(this.space.left, indentLeft, ...this.space.column, this.space.right)
    return result + (totalSpace * this.scaleX);
}

export default GetChildrenWidth;