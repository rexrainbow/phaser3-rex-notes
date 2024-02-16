import RunChildrenWrapBase from '../basesizer/RunHeightWrap.js';
import ExpandFitRatioChildren from './ExpandFitRatioChildren.js';

var RunHeightWrap = function (height) {
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