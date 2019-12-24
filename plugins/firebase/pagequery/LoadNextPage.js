var LoadNextPage = function () {
    if (this.pageIndex === undefined) {
        return this.loadFirstPage();
    }

    var query = this.nextQuery.startAfter(this.currPageEndDocRef).limit(this.itemCount);
    var self = this;
    return query.get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.pageIndex += 1;
            self.startItemIndex = self.endItemIndex + 1;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            // Doc reference for paging
            self.prevPageEndDocRef = self.currPageEndDocRef;
            self.currPageStartDocRef = querySnapshot.docs[0];
            self.currPageEndDocRef = querySnapshot.docs[docCount - 1];
            // Cache result items
            self.cacheItems = querySnapshot.docs;
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadNextPage;