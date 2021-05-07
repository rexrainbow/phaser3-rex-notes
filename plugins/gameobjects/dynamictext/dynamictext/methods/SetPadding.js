import { SetPadding as SetPaddingBase } from '../../../../utils/padding/PaddingMethods.js';

var SetPadding = function (key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
        paddingRight = padding.right,
        paddingTop = padding.top,
        paddingBottom = padding.bottom;

    SetPaddingBase(this.padding, key, value);

    this.dirty = this.dirty ||
        (paddingLeft != this.padding.left) ||
        (paddingRight != this.padding.right) ||
        (paddingTop != this.padding.top) ||
        (paddingBottom != this.padding.bottom)
        ;
    return this;
};

export default SetPadding;