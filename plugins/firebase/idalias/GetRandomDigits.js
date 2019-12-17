var GetRandomDigits = function (id, digits, retry) {
    var self = this;
    return this.getAlias(id)
        .then(function (result) {
            if (result.alias) {
                return Promise.resolve(result);
            } else {
                return self.addRandomDigits(id, digits, retry);
            }
        })
};

export default GetRandomDigits;