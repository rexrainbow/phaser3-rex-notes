import { Scene as PhaserScene } from 'phaser';
const SceneClass = PhaserScene;
var IsSceneObject = function(object?: any) {
    return (object instanceof SceneClass);
}
export default IsSceneObject;