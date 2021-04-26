import { GetPadding, SetPadding } from '../../../plugins/utils/padding/PaddingMethods.js';

export default {
    getInnerPadding(key) {
        return GetPadding(this.space, key);
    },

    setInnerPadding(key, value) {
        SetPadding(this.space, key, value);
        return this;
    },

    getOutterPadding(key) {
        return GetPadding(this.getSizerConfig(this).padding, key);
    },

    setOuterPadding(key, value) {
        SetPadding(this.getSizerConfig(this).padding, key, value);
        return this;
    },
}