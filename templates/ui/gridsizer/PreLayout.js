import PreLayoutBase from '../basesizer/PreLayout.js';

var PreLayout = function () {
    this._totalColumnProportions = undefined;
    this._totalRowProportions = undefined;
    this.hasColumnProportion0Child = false;
    this.hasRowProportion0Child = false;
    this.proportionWidthLength = undefined;  // Display proportion-length, contains scale
    this.proportionHeightLength = undefined; // Display proportion-length, contains scale
    PreLayoutBase.call(this);
    return this;
}
export default PreLayout;