import GetGame from '../system/GetGame.js';

var CreatePaddingTexture = function (game, destinationKey, sourceKey, paddingX, paddingY) {
    var textureManager = GetGame(game).textures;

    if (textureManager.exists(destinationKey)) {
        textureManager.remove(destinationKey);
    }

    var frame = textureManager.getFrame(sourceKey);
    var width = frame.cutWidth + paddingX * 2;
    var height = frame.cutHeight + paddingY * 2;
    var destinationTexture = textureManager.addDynamicTexture(destinationKey, width, height);
    destinationTexture.drawFrame(sourceKey, undefined, paddingX, paddingY);

    return destinationTexture;
}

export default CreatePaddingTexture;