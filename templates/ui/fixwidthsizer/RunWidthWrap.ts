import RunChildrenWrapBase from '../basesizer/RunWidthWrap';
import RunChildrenWrap from './RunChildrenWrap';

var RunWidthWrap = function(width?: any) {
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