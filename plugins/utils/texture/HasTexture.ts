import GetGame from '../system/GetGame';

var HasTexture = function(game?: any, key?: any, frame?: any) {
    game = GetGame(game);
    var cache = game.textures;

    var hasTexture = cache.exists(key);
    if (frame === undefined) {
        return hasTexture;
    }

    return cache.get(key).has(frame);
}

export default HasTexture;