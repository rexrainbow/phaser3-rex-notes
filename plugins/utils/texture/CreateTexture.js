import GetGame from '../system/GetGame.js';

var CreateTexture = function (game, key, width, height, useDynamicTexture) {
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