import GetGame from '../system/GetGame.js';

var GetWhiteFrame = function (game) {
    return GetGame(game).textures.getFrame('__WHITE');
}

export default GetWhiteFrame;