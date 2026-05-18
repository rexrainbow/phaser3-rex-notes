import HasWidthWrapBase from '../basesizer/HasWidthWrap';

var HasWidthWrap = function() {
    if (this.hasRatioFitChild && (this.orientation === 1)) {
        return true;
    }

    return HasWidthWrapBase.call(this);
}

export default HasWidthWrap;