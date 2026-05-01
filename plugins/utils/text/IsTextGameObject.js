import { GameObjects as PhaserGameObjects } from 'phaser';
const TextClass = PhaserGameObjects.Text;

var IsTextGameObject = function (gameObject) {
    return (gameObject instanceof TextClass);
}

export default IsTextGameObject;