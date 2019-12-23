var LoadFirstPage = function (baselineDoc) {
    if (baselineDoc !== undefined) {
        this.setBaselineDoc(baselineDoc);
    }

    var query = this.nextQuery;
    if (this.baselineDocRef) {
        query = query[this.baselineMode](this.baselineDocRef)
    }
    query = query.limit(this.itemCount);
    var self = this;
    return query.get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.pageIndex = 0;
            self.startItemIndex = 0;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            // Doc reference for paging
            self.prevPageEndDocRef = undefined;
            self.currPageStartDocRef = querySnapshot.docs[0];
            self.currPageEndDocRef = querySnapshot.docs[docCount - 1];
            // Cache result items
            self.cacheItems = querySnapshot.docs;
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadFirstPage;