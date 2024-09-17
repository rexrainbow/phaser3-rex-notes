import { Scene } from "phaser";
const SceneClass = Scene;
var IsSceneObject = function (object) {
    return (object instanceof SceneClass);
}
export default IsSceneObject;