import { GameObjects as PhaserGameObjects } from 'phaser';
const LayerClass = PhaserGameObjects.Layer;

var IsLayerGameObject = function(gameObject?: any) {
    return (gameObject instanceof LayerClass);
}

export default IsLayerGameObject;