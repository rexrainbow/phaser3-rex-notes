import RunChildrenWrapBase from '../basesizer/RunWidthWrap.js';
import RunChildrenWrap from './RunChildrenWrap.js';

var RunWidthWrap = function (width) {
    if (this.wrapResult) {
        // Already got wrapResult
        return;
    }

    if (this.orientation === 0) {
        var innerWidth = width - ((this.space.left + this.space.right) * this.scaleX);
        this.wrapResult = RunChildrenWrap.call(this, innerWidth);
        this.rexSizer.resolved = true;
        RunChildrenWrapBase.call(this, width);
    }
}

export default RunWidthWrap;