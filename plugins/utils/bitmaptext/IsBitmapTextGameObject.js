import { GameObjects } from "phaser";

const BitmapTextClass = GameObjects.BitmapText;

var IsBitmapTextGameObject = function (gameObject) {
    return (gameObject instanceof BitmapTextClass);
}

export default IsBitmapTextGameObject;