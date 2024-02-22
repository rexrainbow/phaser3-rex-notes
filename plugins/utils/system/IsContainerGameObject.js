const ContainerClass = Phaser.GameObjects.Container;

var IsContainerGameObject = function (gameObject) {
    return (gameObject instanceof ContainerClass);
}

export default IsContainerGameObject;