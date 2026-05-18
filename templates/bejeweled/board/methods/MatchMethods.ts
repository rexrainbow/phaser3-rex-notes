export default {
    setMatchAcceptList(acceptList?: any) {
        this.matchAcceptList = acceptList;
        return this;
    },

    setMatchIgnoreList(ignoreList?: any) {
        this.matchIgnoreList = ignoreList;
        return this;
    }
}