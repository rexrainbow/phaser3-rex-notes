var Add = function(id?: any, alias?: any) {
    var self = this;
    return this.database.runTransaction(function(transaction?: any) {
        var aliasRef = self.getAliasRef(alias);
        return transaction.get(aliasRef).then(function(doc?: any) {
            if (!doc.exists) {
                transaction.set(aliasRef, { id: id });
                return Promise.resolve({ id: id, alias: alias });
            } else {
                return Promise.reject({ id: id, alias: alias });
            }
        });
    });
}
export default Add;