import PreLayoutBase from '../basesizer/PreLayout.js';

var PreLayout = function () {
    this._totalColumnProportions = undefined;
    this._totalRowProportions = undefined;
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;