import GetGame from '../system/GetGame.js';
import IsGameObject from '../system/IsGameObject.js';
import IsTextureObject from '../system/IsTextureObject.js';
import IsFrameObject from '../system/IsFrameObject.js';

var CreatePaddingTexture = function (game, textureKey, paddingX, paddingY, targetTextureKey) {
    var frameName;
    if (typeof (textureKey) === 'string') {
        frameName = undefined;
    } else if (IsGameObject(textureKey)) {
        var gameObject = textureKey;
        textureKey = gameObject.texture.key;
        frameName = gameObject.frame.name;
    } else if (IsTextureObject(textureKey)) {
        var texture = textureKey;
        textureKey = texture.key;
        frameName = undefined;
    } else if (IsFrameObject(textureKey)) {
        var frame = texture;
        textureKey = frame.texture.key;
        frameName = frame.name;
    }

    if (targetTextureKey === undefined) {
        targetTextureKey = `${textureKey}_padding`;
    }

    var textureManager = GetGame(game).textures;

    var frame = textureManager.getFrame(textureKey, frameName);
    var targetTextureWidth = frame.cutWidth + paddingX * 2;
    var targetTextureHeight = frame.cutHeight + paddingY * 2;

    if (textureManager.exists(targetTextureKey)) {
        textureManager.remove(targetTextureKey);
    }
    var targetTexture = textureManager.createCanvas(targetTextureKey, targetTextureWidth, targetTextureHeight);
    targetTexture.drawFrame(textureKey, frameName, paddingX, paddingY);

    return targetTexture;
}

export default CreatePaddingTexture;