import ResolveHeightBase from '../basesizer/ResolveHeight.js';

var ResolveHeight = function (parent, height) {
    var height = ResolveHeightBase.call(this, parent, height);

    // Get proportionLength    
    if (this.proportionHeightLength === undefined) {
        var totalRowProportions = this.totalRowProportions;
        if (totalRowProportions > 0) {
            var remainder = height - this.childrenHeight;
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