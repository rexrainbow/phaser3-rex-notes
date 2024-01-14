import HasHeightWrapBase from '../basesizer/HasHeightWrap.js';

var HasHeightWrap = function () {
    if (this.orientation === 1) {
        return true;
    }

    return HasHeightWrapBase.call(this);
}

export default HasHeightWrap;