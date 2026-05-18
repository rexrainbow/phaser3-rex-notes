import GetGame from '../system/GetGame';

var CreateTexture = function(game?: any, key?: any, width?: any, height?: any, useDynamicTexture?: any) {
    game = GetGame(game);

    if (useDynamicTexture === undefined) {
        useDynamicTexture = false;
    }

    var textureManager = game.textures;

    if (textureManager.exists(key)) {
        textureManager.remove(key);
    }

    var methodName = (useDynamicTexture) ? 'addDynamicTexture' : 'createCanvas';

    return textureManager[methodName](key, width, height);
}

export default CreateTexture;