var GetId = function(alias?: any) {
    return this.getAliasRef(alias).get()
        .then(function(doc?: any) {
            var id;
            if (doc.exists) {
                id = doc.data().id;
            }
            return Promise.resolve({
                id: id,
                alias: alias
            });
        });
}

export default GetId;