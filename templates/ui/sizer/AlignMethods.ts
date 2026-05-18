import ALIGNMODE from '../utils/AlignConst';

export default {
    getChildAlign(gameObject?: any) {
        return this.getSizerConfig(gameObject).align;
    },

    setChildAlign(gameObject?: any, align?: any) {
        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }

        this.getSizerConfig(gameObject).align = align;
        return this;
    },

}