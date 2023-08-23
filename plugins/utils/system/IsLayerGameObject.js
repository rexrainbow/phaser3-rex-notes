const LayerKlass = Phaser.GameObjects.Layer;

var IsLayerGameObject = function (gameObject) {
    return (gameObject instanceof LayerKlass);
}

export default IsLayerGameObject;