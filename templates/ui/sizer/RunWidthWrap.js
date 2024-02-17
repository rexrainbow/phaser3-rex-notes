import RunChildrenWrapBase from '../basesizer/RunWidthWrap.js';
import ExpandFitRatioChildren from './ExpandFitRatioChildren.js';

var RunWidthWrap = function (width) {
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