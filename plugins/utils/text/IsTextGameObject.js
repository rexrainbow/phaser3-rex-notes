const TextClass = Phaser.GameObjects.Text;

var IsTextGameObject = function (gameObject) {
    return (gameObject instanceof TextClass);
}

export default IsTextGameObject;