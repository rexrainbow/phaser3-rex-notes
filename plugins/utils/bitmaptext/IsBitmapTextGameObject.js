import { GameObjects as PhaserGameObjects } from 'phaser';
const BitmapTextClass = PhaserGameObjects.BitmapText;

var IsBitmapTextGameObject = function (gameObject) {
    return (gameObject instanceof BitmapTextClass);
}

export default IsBitmapTextGameObject;