var LoadNextPage = function () {
    var self = this;
    return this.nextQuery.startAfter(this.endDocRef).limit(this.itemCount).get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.pageIndex += 1;
            self.startItemIndex = self.endItemIndex + 1;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.startDocRef = querySnapshot.docs[0];
            self.endDocRef = querySnapshot.docs[docCount - 1];
            return Promise.resolve(querySnapshot);
        })
}

export default LoadNextPage;