import PreLayoutBase from '../basesizer/PreLayout.js';
import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';

var PreLayout = function () {
    // Resize child to 1x1 for ratio-fit 
    this.hasRatioFitChild = false;
    var child, sizerConfig;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        sizerConfig = child.rexSizer;
        if (sizerConfig.hidden) {
            continue;
        }

        if (sizerConfig.fitRatio > 0) {
            ResizeGameObject(child, 0, 0);
            sizerConfig.resolved = false;
            this.hasRatioFitChild = true;
        }

    }

    this._childrenProportion = undefined;
    this.hasProportion0Child = false;
    this.proportionLength = undefined; // Display proportion-length, contains scale
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;