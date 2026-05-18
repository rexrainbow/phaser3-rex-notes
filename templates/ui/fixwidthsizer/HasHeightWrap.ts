import HasHeightWrapBase from '../basesizer/HasHeightWrap';

var HasHeightWrap = function() {
    if (this.orientation === 1) {
        return true;
    }

    return HasHeightWrapBase.call(this);
}

export default HasHeightWrap;