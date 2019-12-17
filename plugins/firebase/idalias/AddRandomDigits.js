import GetRandomWord from '../../utils/string/GetRandomWord.js';
import AddAliasTransaction from './AddAliasTransaction.js';

const candidates = '0123456789';
var AddRandomDigits = function (id, digits, retry) {
    if (digits === undefined) {
        digits = 10;
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
                return TryAdd.call(self, id, digits, retry);
            }
        });
}

var TryAdd = function (id, digits, retry) {
    var alias = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
        return Promise.reject({ id: id, alias: alias });
    }
    retry--;
    var self = this;
    return AddAliasTransaction.call(self, id, alias)
        .catch(function () {
            setTimeout(function () {
                return TryAdd.call(self, id, digits, retry);
            }, 0);
        });
}

export default AddRandomDigits;