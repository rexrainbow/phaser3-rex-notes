import LoadInRange from '../utils/query/LoadInRange.js';

var LoadCurrentPage = function () {
    if ((this.pageIndex === undefined) || (this.pageIndex === 0)) {
        return this.loadFirstPage();
    }

    var callback = (this.dataMode === 0) ? LoadStaticPage : LoadDynamicPage;
    return callback.call(this);
}

var LoadStaticPage = function () {
    var self = this;
    return LoadInRange(this.nextQuery, 0, this.itemCount, this.prevPageEndDocRef, 'startAfter')
        .then(function (docs) {
            var docCount = docs.length;
            self.cacheItems = docs;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.isFullPage = (docCount === self.itemCount);
            // Doc reference for paging
            self.currPageStartDocRef = docs[0];
            self.currPageEndDocRef = docs[docCount - 1];
            return Promise.resolve(self.cacheItems);
        })
}

var LoadDynamicPage = function () {
    var skip = this.pageIndex * this.itemCount;
    var self = this;
    return LoadInRange(this.nextQuery, skip, this.itemCount, this.baselineDocRef, this.baselineMode)
        .then(function (docs) {
            var docCount = docs.length;
            self.cacheItems = docs;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.isFullPage = (docCount === self.itemCount);
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadCurrentPage;