import Load from '../utils/query/Load.js';

var LoadCurrentPage = function () {
    if ((this.pageIndex === undefined) || (this.pageIndex === 0)) {
        return this.loadFirstPage();
    }

    var self = this;
    return Load(this.nextQuery, this.itemCount, this.prevPageEndDocRef, 'startAfter')
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

export default LoadCurrentPage;