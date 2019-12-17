import RetryAddRandomAliasTransaction from './RetryAddRandomAliasTransaction.js';

const NUMBERS = '0123456789';
var GetRandomAlias = function (id, digits, candidates, retry) {
    if (digits === undefined) {
        digits = 10;
    }
    if (candidates === undefined) {
        candidates = NUMBERS;
    }
    if (retry === undefined) {
        retry = 1000;
    }

    var self = this;
    return this.getAlias(id)
        .then(function (result) {
            if (result.alias) {
                return Promise.resolve(result);
            } else {
                return RetryAddRandomAliasTransaction.call(self, id, digits, candidates, retry);
            }
        })
};

export default GetRandomAlias;