import ResolveWidthBase from '../basesizer/ResolveWidth.js';

var ResolveWidth = function (parent, width) {
    var width = ResolveWidthBase.call(this, parent, width);

    // Get proportionLength
    var totalColumnProportions = this.totalColumnProportions;
    if (totalColumnProportions > 0) {
        var remainder = width - this.childrenWidth;
        if (remainder >= 0) {
            this.proportionWidthLength = remainder / totalColumnProportions;
        } else {
            // Warning
        }
    } else {
        this.proportionWidthLength = 0;
    }

    if (!parent) {
        // Resolve width of sizer children
        this.resolveChildrenWidth(width);
    }

    return width;
}

export default ResolveWidth;