import RunChildrenWrapBase from '../basesizer/RunHeightWrap.js';
import RunChildrenWrap from './RunChildrenWrap.js';

var RunHeightWrap = function (height) {
    if (this.wrapResult) {
        // Already got wrapResult
        return;
    }

    if (this.orientation === 1) {
        var innerHeight = height - ((this.space.top + this.space.bottom) * this.scaleY);
        this.wrapResult = RunChildrenWrap.call(this, innerHeight);
        this.rexSizer.resolved = true;
        RunChildrenWrapBase.call(this, height);
    }
}

export default RunHeightWrap;