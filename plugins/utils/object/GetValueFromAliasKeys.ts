import HasValue from './HasValue';
import GetValue from './GetValue';

var GetValueFromAliasKeys = function(source?: any, key0?: any, key1?: any, key2?: any, defaultValue?: any) {
    if (HasValue(source, key0)) {
        return GetValue(source, key0);
    } else if (key1 && HasValue(source, key1)) {
        return GetValue(source, key1);
    } else if (key2 && HasValue(source, key2)) {
        return GetValue(source, key2);
    } else {
        return defaultValue;
    }

}

export default GetValueFromAliasKeys;