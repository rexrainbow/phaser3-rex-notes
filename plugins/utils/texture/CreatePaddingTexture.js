import GetGame from '../system/GetGame.js';
import GetBoundsConfig from '../bounds/GetBoundsConfig.js';

var CreatePaddingTexture = function (game, destinationKey, sourceKey, padding) {
    padding = GetBoundsConfig(padding);

    var textureManager = GetGame(game).textures;

    if (textureManager.exists(destinationKey)) {
        textureManager.remove(destinationKey);
    }

    var frame = textureManager.getFrame(sourceKey);
    var width = frame.cutWidth + padding.left + padding.right;
    var height = frame.cutHeight + padding.top + padding.bottom;

    var destinationTexture = textureManager.addDynamicTexture(destinationKey, width, height);
    destinationTexture.drawFrame(sourceKey, undefined, padding.left, padding.top);

    return destinationTexture;
}

export default CreatePaddingTexture;