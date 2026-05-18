export default {
    setTabsPadding(key?: any, value?: any) {
        var tabs = this.childrenMap.tabs;
        tabs.setOuterPadding(key, value);
        return this;
    },

    getTabsPadding(key?: any) {
        var tabs = this.childrenMap.tabs;
        return tabs.getOuterPadding(key);
    }
}