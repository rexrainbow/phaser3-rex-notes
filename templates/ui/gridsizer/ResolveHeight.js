import ResolveHeightBase from '../basesizer/ResolveHeight.js';

var ResolveHeight = function (height, forceResolving) {
    var height = ResolveHeightBase.call(this, height, forceResolving);

    // Get proportionLength    
    if (forceResolving ||
        (this.proportionHeightLength === undefined)
    ) {
        var totalRowProportions = this.totalRowProportions;
        if (totalRowProportions > 0) {
            var remainder = height - this.getChildrenHeight(false);
            if (remainder >= 0) {
                this.proportionHeightLength = remainder / totalRowProportions;
            } else {
                // Warning
            }
        } else {
            this.proportionHeightLength = 0;
        }
    }

    return height;
}

export default ResolveHeight;