import { GameObjects as PhaserGameObjects } from 'phaser';
const GameObjectClass = PhaserGameObjects.GameObject;
const LayerClass = PhaserGameObjects.Layer;

var IsGameObject = function(object?: any) {
    return (object instanceof GameObjectClass) || (object instanceof LayerClass);
}

export default IsGameObject;