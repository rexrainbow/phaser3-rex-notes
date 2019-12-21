var LoadPreviousPage = function () {
    if ((this.pageIndex === undefined) || (this.pageIndex === 1)) {
        return this.loadFirstPage();
    }

    var self = this;
    return this.prevQuery.startAfter(this.currPageStartDocRef).limit(this.itemCount + 1).get()
        // Get one more document for previous page end
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size - 1;
            self.pageIndex -= 1;
            self.endItemIndex = self.startItemIndex - 1;
            self.startItemIndex = self.endItemIndex - docCount + 1;
            // Doc reference for paging
            self.prevPageEndDocRef = querySnapshot.docs[docCount];
            self.startDocRed = querySnapshot.docs[docCount - 1];
            self.currPageEndDocRef = querySnapshot.docs[0];
            // Cache result items
            self.cacheItems = querySnapshot.docs;
            self.cacheItems.pop(); // Pop up endDoc of previous page
            self.cacheItems.reverse();
            return Promise.resolve(self.cacheItems);
        })
}

export default LoadPreviousPage;