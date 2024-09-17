import { GameObjects } from "phaser";
const LayerClass = GameObjects.Layer;

var IsLayerGameObject = function (gameObject) {
    return (gameObject instanceof LayerClass);
}

export default IsLayerGameObject;