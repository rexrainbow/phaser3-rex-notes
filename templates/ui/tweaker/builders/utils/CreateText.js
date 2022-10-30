const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new PhaserText(scene, 0, 0, '', style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateText;