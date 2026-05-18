import GetGame from '../../../utils/system/GetGame';
import { CacheName } from '../Const';

var GetCharacterCache = function(scene?: any, key?: any) {
    var cache = GetGame(scene).cache.custom[CacheName];
    if (!cache) {
        return null;
    }

    return cache.get(key);
}

export default GetCharacterCache;