import GetGame from './GetGame';

var GetCache = function(game?: any, loaderType?: any, cacheType?: any) {
    if (cacheType === undefined) {
        switch (loaderType?: any) {
            case 'image':
            case 'svg':
                cacheType = 'textures';
                break;

            case 'animation':
                cacheType = 'json';
                break;

            case 'tilemapTiledJSON':
            case 'tilemapCSV':
                cacheType = 'tilemap';
                break;

            case 'glsl':
                cacheType = 'shader';
                break;

            default:
                cacheType = loaderType;
                break;
        }
    }

    game = GetGame(game);
    var cache;
    if (cacheType === 'textures') {
        cache = game.textures;
    } else {
        cache = game.cache[cacheType];
    }
    return cache;
}

export default GetCache;