import { Scene as PhaserScene } from 'phaser';
const SceneClass = PhaserScene;
var IsSceneObject = function (object) {
    return (object instanceof SceneClass);
}
export default IsSceneObject;