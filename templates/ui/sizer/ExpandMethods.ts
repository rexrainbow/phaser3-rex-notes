export default {
    getChildExpand(gameObject?: any) {
        return this.getSizerConfig(gameObject).expand;
    },

    setChildExpand(gameObject?: any, expand?: any) {
        this.getSizerConfig(gameObject).expand = expand;
        return this;
    },

}