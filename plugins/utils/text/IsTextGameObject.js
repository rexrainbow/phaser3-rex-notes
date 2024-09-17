import { GameObjects } from "phaser";

const TextClass = GameObjects.Text;

var IsTextGameObject = function (gameObject) {
    return (gameObject instanceof TextClass);
}

export default IsTextGameObject;