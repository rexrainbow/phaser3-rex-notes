import FileChooser from './FileChooser.js';
import IsGame from '../../utils/system/IsGame.js';
import IsSceneObject from '../../utils/system/IsSceneObject.js';
import IsGameObject from '../../utils/system/IsGameObject.js';

var Open = function (scene, config) {
    if (GlobFileChooser === undefined) {
        var game;
        if (IsGame(scene)) {
            game = scene;
        } else if (IsSceneObject(scene)) {
            game = scene.game;
        } else if (IsGameObject(scene)) {                    
            game = scene.scene.game;
        }
        GlobFileChooser = new FileChooser(game);
    }
    GlobFileChooser.resetFromJSON(config);
    return GlobFileChooser.open();
}

var GlobFileChooser = undefined;

export default Open;