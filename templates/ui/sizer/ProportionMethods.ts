export default {
    getChildProportion(gameObject?: any) {
        return this.getSizerConfig(gameObject).proportion;
    },

    setChildProportion(gameObject?: any, proportion?: any) {
        this.getSizerConfig(gameObject).proportion = proportion;
        return this;
    },

}