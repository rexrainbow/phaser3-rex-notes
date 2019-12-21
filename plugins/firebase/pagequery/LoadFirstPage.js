var LoadFirstPage = function () {
    var self = this;
    return this.nextQuery.limit(this.itemCount).get()
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