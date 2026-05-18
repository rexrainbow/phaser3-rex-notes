import RunChildrenWrapBase from '../basesizer/RunWidthWrap';
import ExpandFitRatioChildren from './ExpandFitRatioChildren';

var RunWidthWrap = function(width?: any) {
    if (this.wrapResult) {
        // Already got wrapResult
        return;
    }

    if (this.orientation === 1) {
        ExpandFitRatioChildren.call(this, width, undefined);
    }

    RunChildrenWrapBase.call(this, width);
}

export default RunWidthWrap;