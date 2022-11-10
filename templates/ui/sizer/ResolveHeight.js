import ResolveHeightBase from '../basesizer/ResolveHeight.js';

var ResolveHeight = function (height, forceResolving) {
    var height = ResolveHeightBase.call(this, height, forceResolving);

    // Get proportionLength
    if (forceResolving ||
        ((this.proportionLength === undefined) && (this.orientation === 1))
    ) {
        var remainder = height - this.childrenHeight;
        if (remainder > 0) {
            remainder = height - this.getChildrenHeight(false);
            this.proportionLength = remainder / this.childrenProportion;
        } else {
            this.proportionLength = 0;
            if (remainder < 0) {
                // Warning
            }
        }
    }

    return height;
}

export default ResolveHeight;