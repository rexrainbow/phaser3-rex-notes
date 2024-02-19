const LayerClass = Phaser.GameObjects.Layer;

var IsLayerGameObject = function (gameObject) {
    return (gameObject instanceof LayerClass);
}

export default IsLayerGameObject;