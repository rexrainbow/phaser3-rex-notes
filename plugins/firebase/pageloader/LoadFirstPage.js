import Load from '../utils/query/Load.js';

var LoadFirstPage = function () {
    var self = this;
    return Load(this.nextQuery, this.itemCount, this.baselineDocRef, this.baselineMode)
        .then(function (docs) {
            var docCount = docs.length;
            self.cacheItems = docs;
            self.pageIndex = 0;
            self.startItemIndex = 0;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.isFullPage = (docCount === self.itemCount);
            // Doc reference for paging
            self.prevPageEndDocRef = undefined;
            self.currPageStartDocRef = docs[0];
            self.currPageEndDocRef = docs[docCount - 1];
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadFirstPage;