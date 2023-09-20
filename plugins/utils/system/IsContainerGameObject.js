const ContainerKlass = Phaser.GameObjects.Container;

var IsContainerGameObject = function (gameObject) {
    return (gameObject instanceof ContainerKlass);
}

export default IsContainerGameObject;