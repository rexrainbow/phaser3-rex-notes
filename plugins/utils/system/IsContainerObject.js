const ContainerKlass = Phaser.GameObjects.Container;

var IsContainerObject = function (gameObject) {
    return (gameObject instanceof ContainerKlass);
}

export default IsContainerObject;