import { GameObjects as PhaserGameObjects } from 'phaser';
const BitmapTextClass = PhaserGameObjects.BitmapText;

var IsBitmapTextGameObject = function(gameObject?: any) {
    return (gameObject instanceof BitmapTextClass);
}

export default IsBitmapTextGameObject;