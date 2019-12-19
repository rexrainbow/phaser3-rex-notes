var LoadFirstPage = function () {
    var self = this;
    return this.nextQuery.limit(this.itemCount).get()
        .then(function (querySnapshot) {
            var docCount = querySnapshot.size;
            self.pageIndex = 0;
            self.startItemIndex = 0;
            self.endItemIndex = self.startItemIndex + docCount - 1;
            self.startDocRef = querySnapshot.docs[0];
            self.endDocRef = querySnapshot.docs[docCount - 1];
            return Promise.resolve(querySnapshot);
        })
}

export default LoadFirstPage;