import { GameObjects as PhaserGameObjects } from 'phaser';
const ContainerClass = PhaserGameObjects.Container;

var IsContainerGameObject = function(gameObject?: any) {
    return (gameObject instanceof ContainerClass);
}

export default IsContainerGameObject;