import ALIGNMODE from '../utils/AlignConst.js';

export default {
    getChildAlign(gameObject) {
        return this.getSizerConfig(gameObject).algin;
    },

    setChildAlign(gameObject, align) {
        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }

        this.getSizerConfig(gameObject).algin = align;
        return this;
    },

}