import GetValue from '../../../utils//object/GetValue';
import RetryAddRandomAliasTransaction from './RetryAddRandomAliasTransaction';

var GetRandomAlias = function(id?: any, config?: any) {
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);

    var self = this;
    return this.getAlias(id)
        .then(function(result?: any) {
            if (result.alias) {
                return Promise.resolve(result);
            } else {
                return RetryAddRandomAliasTransaction.call(self, id, digits, candidates, retry);
            }
        })
};

export default GetRandomAlias;