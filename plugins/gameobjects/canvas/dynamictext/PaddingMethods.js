import { GetPadding, SetPadding } from '../../../utils/padding/PaddingMethods.js';

export default {
    setPadding(key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding(this.padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != this.padding.left) ||
            (paddingRight != this.padding.right) ||
            (paddingTop != this.padding.top) ||
            (paddingBottom != this.padding.bottom)
            ;
        return this;
    },

    getPadding(key) {
        return GetPadding(this.padding, key);
    }

}