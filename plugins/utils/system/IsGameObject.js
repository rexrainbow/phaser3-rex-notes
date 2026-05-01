import { GameObjects as PhaserGameObjects } from 'phaser';
const GameObjectClass = PhaserGameObjects.GameObject;
const LayerClass = PhaserGameObjects.Layer;

var IsGameObject = function (object) {
    return (object instanceof GameObjectClass) || (object instanceof LayerClass);
}

export default IsGameObject;