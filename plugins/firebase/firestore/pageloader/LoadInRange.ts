import Load from '../utils/query/Load';

var LoadInRange = function(count?: any, skip?: any) {
    if (skip === undefined) {
        skip = 0;
    }

    var self = this;
    return Load(this.nextQuery, count, skip, this.baselineDocRef, this.baselineMode)
        .then(function(docs?: any) {
            var docCount = docs.length;
            self.cacheItems = docs;
            self.pageIndex = undefined; // Not in Page mode
            self.startItemIndex = skip;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.isFullPage = (count === undefined) ? true : (docCount === count);
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadInRange;