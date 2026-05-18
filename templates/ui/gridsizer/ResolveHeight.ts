import ResolveHeightBase from '../basesizer/ResolveHeight';

var ResolveHeight = function(height?: any) {
    var height = ResolveHeightBase.call(this, height);

    // Get proportionLength    
    if ((height !== undefined) && (this.proportionHeightLength === undefined)) {
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