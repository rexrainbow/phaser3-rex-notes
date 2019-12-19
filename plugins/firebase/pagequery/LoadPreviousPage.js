var LoadPreviousPage = function () {
    if (this.pageIndex === undefined) {
        return this.loadFirstPage();
    }

    var self = this;
    return this.prevQuery.startAfter(this.startDocRef).limit(this.itemCount).get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.pageIndex -= 1;
            self.endItemIndex = self.startItemIndex - 1;
            self.startItemIndex = self.endItemIndex - docCount + 1;
            self.startDocRed = querySnapshot.docs[docCount - 1];
            self.endDocRef = querySnapshot.docs[0];
            return Promise.resolve(querySnapshot.docs.reverse());
        })
}

export default LoadPreviousPage;