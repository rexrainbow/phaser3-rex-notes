import RunChildrenWrapBase from '../basesizer/RunHeightWrap';
import RunChildrenWrap from './RunChildrenWrap';

var RunHeightWrap = function(height?: any) {
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