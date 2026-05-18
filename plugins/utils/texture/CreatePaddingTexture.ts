import GetGame from '../system/GetGame';
import GetBoundsConfig from '../bounds/GetBoundsConfig';
import CreateTexture from './CreateTexture';

var CreatePaddingTexture = function(game?: any, destinationKey?: any, sourceKey?: any, padding?: any) {
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