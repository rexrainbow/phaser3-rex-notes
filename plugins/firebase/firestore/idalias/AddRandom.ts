import GetValue from '../../../utils/object/GetValue';
import GetRandomWord from '../../../utils/string/GetRandomWord';
import RetryAddRandomAliasTransaction from './RetryAddRandomAliasTransaction';

var AddRandom = function(id?: any, config?: any) {
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);

    var self = this;
    return this.getAlias(id)
        .then(function(result?: any) {
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