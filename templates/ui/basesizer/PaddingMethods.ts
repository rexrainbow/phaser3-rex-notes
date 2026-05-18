import { GetPadding, SetPadding } from '../../../plugins/utils/padding/PaddingMethods';

export default {
    getInnerPadding(key?: any) {
        return GetPadding(this.space, key);
    },

    setInnerPadding(key?: any, value?: any) {
        SetPadding(this.space, key, value);
        return this;
    },

    getOuterPadding(key?: any) {
        return GetPadding(this.getSizerConfig(this).padding, key);
    },

    setOuterPadding(key?: any, value?: any) {
        SetPadding(this.getSizerConfig(this).padding, key, value);
        return this;
    },

    getChildOuterPadding(child?: any, key?: any) {
        if (typeof (child) === 'string') {
            child = this.getElement(child);
        }
        return GetPadding(this.getSizerConfig(child).padding, key);
    },

    setChildOuterPadding(child?: any, key?: any, value?: any) {
        if (typeof (child) === 'string') {
            child = this.getElement(child);
        }
        SetPadding(this.getSizerConfig(child).padding, key, value);
        return this;
    },
}