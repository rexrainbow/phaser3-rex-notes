import HasWidthWrapBase from '../basesizer/HasWidthWrap';

var HasWidthWrap = function() {
    if (this.orientation === 0) {
        return true;
    }

    return HasWidthWrapBase.call(this);
}

export default HasWidthWrap;