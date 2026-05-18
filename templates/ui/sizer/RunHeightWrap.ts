import RunChildrenWrapBase from '../basesizer/RunHeightWrap';
import ExpandFitRatioChildren from './ExpandFitRatioChildren';

var RunHeightWrap = function(height?: any) {
    if (this.wrapResult) {
        // Already got wrapResult
        return;
    }

    if (this.orientation === 0) {
        ExpandFitRatioChildren.call(this, undefined, height);
    }

    RunChildrenWrapBase.call(this, height);
}

export default RunHeightWrap;