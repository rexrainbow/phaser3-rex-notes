export default {
    setTabsPadding(key, value) {
        var tabs = this.childrenMap.tabs;
        tabs.setOuterPadding(key, value);
        return this;
    },

    getTabsPadding(key) {
        var tabs = this.childrenMap.tabs;
        return tabs.getOuterPadding(key);
    }
}