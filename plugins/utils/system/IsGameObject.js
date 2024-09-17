import { GameObjects } from "phaser";
const GameObjectClass = GameObjects.GameObject;
var IsGameObject = function (object) {
    return (object instanceof GameObjectClass);
}
export default IsGameObject;