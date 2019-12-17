var GetAlias = function (id) {
    return this.rootRef.where('id', '==', id).limit(1)
        .get()
        .then(function (querySnapshot) {
            var alias;
            querySnapshot.forEach(function (doc) {
                alias = doc.id;
            });
            return Promise.resolve({
                id: id,
                alias: alias
            });
        });
}

export default GetAlias;