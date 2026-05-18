import GetRandomWord from '../../../utils/string/GetRandomWord';
import AddAliasTransaction from './AddAliasTransaction';

var TryAdd = function(id?: any, digits?: any, candidates?: any, retry?: any) {
    var alias = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
        return Promise.reject({ id: id, alias: alias });
    }
    retry--;
    var self = this;
    return AddAliasTransaction.call(self, id, alias)
        .catch(function() {
            setTimeout(function() {
                return TryAdd.call(self, id, digits, candidates, retry);
            }, 0);
        });
}

export default TryAdd;