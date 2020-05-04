import LayoutInitChildBase from '../basesizer/_layoutInit.js';

var LayoutInitChild = function () {
    LayoutInitChildBase.call(this);
    this._maxChildWidth = undefined;
    this._maxChildHeight = undefined;
}
export default LayoutInitChild;