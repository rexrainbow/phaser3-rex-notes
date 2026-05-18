var GetPage = function(key?: any) {
    if (typeof (key) === 'number') {
        key = this.getPageKey(key);
    }
    return this.childrenMap.pages.getPage(key);
}

export default GetPage;