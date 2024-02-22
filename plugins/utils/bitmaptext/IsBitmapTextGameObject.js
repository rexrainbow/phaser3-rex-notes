const BitmapTextClass = Phaser.GameObjects.BitmapText;

var IsBitmapTextGameObject = function (gameObject) {
    return (gameObject instanceof BitmapTextClass);
}

export default IsBitmapTextGameObject;