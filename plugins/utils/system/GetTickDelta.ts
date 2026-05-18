import GetGame from './GetGame';

var GetTickDelta = function(game?: any) {
    return GetGame(game).loop.delta;
}

export default GetTickDelta;