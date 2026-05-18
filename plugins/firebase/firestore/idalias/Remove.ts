var Remove = function(id?: any) {
    var self = this;
    return this.getAlias(id)
        .then(function(alias?: any) {
            return self.getAliasRef(alias).delete();
        })
}

export default Remove;