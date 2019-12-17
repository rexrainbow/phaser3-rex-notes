import GetRandomWord from '../../utils/string/GetRandomWord.js';
import RetryAddRandomAliasTransaction from './RetryAddRandomAliasTransaction.js';

const NUMBERS = '0123456789';
var AddRandom = function (id, digits, candidates, retry) {
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
                var alias = GetRandomWord(digits, digits, candidates);
                if (result.alias === alias) {
                    return Promise.resolve({ id: id, alias: alias });
                } else {
                    return Promise.reject({ id: id, alias: alias });
                }
            } else {
                return RetryAddRandomAliasTransaction.call(self, id, digits, candidates, retry);
            }
        });
}

export default AddRandom;