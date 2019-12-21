var LoadCurrentPage = function () {
    if ((this.pageIndex === undefined) || (this.pageIndex === 0)) {
        return this.loadFirstPage();
    }

    var self = this;
    return this.nextQuery.startAfter(this.prevPageEndDocRef).limit(this.itemCount).get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            // Doc reference for paging
            self.currPageStartDocRef = querySnapshot.docs[0];
            self.currPageEndDocRef = querySnapshot.docs[docCount - 1];
            // Cache result items
            self.cacheItems = querySnapshot.docs;
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadCurrentPage;