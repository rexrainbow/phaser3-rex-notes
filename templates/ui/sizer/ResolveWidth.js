import ResolveWidthBase from '../basesizer/ResolveWidth.js';

var ResolveWidth = function (width, forceResolving) {
    var width = ResolveWidthBase.call(this, width, forceResolving);

    // Calculate proportionLength
    if (forceResolving ||
        ((this.proportionLength === undefined) && (this.orientation === 0))
    ) {
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

    return width;
}

export default ResolveWidth;