import HasHeightWrapBase from '../basesizer/HasHeightWrap.js';

var HasHeightWrap = function () {
    if (this.hasRatioFitChild && (this.orientation === 0)) {
        return true;
    }

    return HasHeightWrapBase.call(this);
}

export default HasHeightWrap;