import IsGame from './IsGame.js';
import IsSceneObject from './IsSceneObject.js';

var GetGame = function (object) {
    if (IsGame(object)) {
        return object;
    } else if (IsGame(object.game)) {
        return object.game;
    } else if (IsSceneObject(object.scene)) { // object = game object
        return object.scene.game;
    }
}

export default GetGame;