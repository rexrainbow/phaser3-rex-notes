import ResolveWidthBase from '../basesizer/ResolveWidth.js';

var ResolveWidth = function (parent, width) {
    var width = ResolveWidthBase.call(this, parent, width);

    // Calculate proportionLength
    if (this.orientation === 0) {
        var remainder = width - this.childrenWidth;
        if (remainder > 0) {
            remainder = width - this.getChildrenWidth(false);
            this.proportionLength = remainder / this.childrenProportion;
        } else {
            this.proportionLength = 0;
            if (remainder < 0) {
                // Warning
            }
        }
    }


    if (!parent) {
        // Resolve width of sizer children
        this.resolveChildrenWidth(width);
        // Run width wrap
        this.runWidthWrap(width);
    }

    return width;
}

export default ResolveWidth;