import IsGame from './IsGame.js';
import IsSceneObject from './IsSceneObject.js';

var GetGame = function (object) {
    if (IsGame(object)) {
        return object;
    } else if (IsSceneObject(object)) {
        return object.game;
    } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
        return object.scene.game;
    }
}

export default GetGame;