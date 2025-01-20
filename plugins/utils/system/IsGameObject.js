const GameObjectClass = Phaser.GameObjects.GameObject;
const LayerClass = Phaser.GameObjects.Layer;

var IsGameObject = function (object) {
    return (object instanceof GameObjectClass) || (object instanceof LayerClass);
}

export default IsGameObject;