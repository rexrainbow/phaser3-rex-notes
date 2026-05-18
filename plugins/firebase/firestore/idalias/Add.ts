import AddAliasTransaction from './AddAliasTransaction';

var Add = function(id?: any, alias?: any) {
    var self = this;
    return this.getAlias(id)
        .then(function(result?: any) {
            if (result.alias) {
                if (result.alias === alias) {
                    return Promise.resolve({ id: id, alias: alias });
                } else {
                    return Promise.reject({ id: id, alias: alias });
                }
            } else {
                return AddAliasTransaction.call(self, id, alias);
            }
        });
}

export default Add;