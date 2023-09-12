import GetGame from '../system/GetGame.js';
import GetBoundsConfig from '../bounds/GetBoundsConfig.js';
import CreateTexture from './CreateTexture.js';

var CreatePaddingTexture = function (game, destinationKey, sourceKey, padding) {
    padding = GetBoundsConfig(padding);

    var textureManager = GetGame(game).textures;

    var frame = textureManager.getFrame(sourceKey);
    if (!frame) {
        return null;
    }

    var width = frame.cutWidth + padding.left + padding.right;
    var height = frame.cutHeight + padding.top + padding.bottom;

    var destinationTexture = CreateTexture(game, destinationKey, width, height, true);
    destinationTexture.drawFrame(sourceKey, undefined, padding.left, padding.top);

    return destinationTexture;
}

export default CreatePaddingTexture;