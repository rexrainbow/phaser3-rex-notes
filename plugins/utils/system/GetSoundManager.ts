import IsSceneObject from './IsSceneObject';

var GetSoundManager = function(game?: any) {
    if (IsSceneObject(game)) {
        return game.sys.sound;
    }
    return game.sound;
}

export default GetSoundManager;