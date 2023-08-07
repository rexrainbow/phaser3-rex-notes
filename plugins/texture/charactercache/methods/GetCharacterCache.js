import GetGame from '../../../utils/system/GetGame.js';
import { CacheName } from '../Const.js';

var GetCharacterCache = function (scene, key) {
    var cache = GetGame(scene).cache.custom[CacheName];
    if (!cache) {
        return null;
    }

    return cache.get(key);
}

export default GetCharacterCache;