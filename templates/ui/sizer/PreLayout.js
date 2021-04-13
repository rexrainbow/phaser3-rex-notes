import PreLayoutBase from '../basesizer/PreLayout.js';

var PreLayout = function () {
    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;