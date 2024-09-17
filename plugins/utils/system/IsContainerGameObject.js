import { GameObjects } from "phaser";
const ContainerClass = GameObjects.Container;

var IsContainerGameObject = function (gameObject) {
    return (gameObject instanceof ContainerClass);
}

export default IsContainerGameObject;