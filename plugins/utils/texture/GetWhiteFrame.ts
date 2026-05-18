import GetGame from '../system/GetGame';

var GetWhiteFrame = function(game?: any) {
    return GetGame(game).textures.getFrame('__WHITE');
}

export default GetWhiteFrame;