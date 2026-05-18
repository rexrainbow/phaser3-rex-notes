var GetScore = function(userID?: any) {
    return this.getMyRecordQuery(userID).get()
        .then(function(querySnapshot?: any) {
            var item;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                item = doc.data();
            }
            return Promise.resolve(item);
        });
}

export default GetScore;