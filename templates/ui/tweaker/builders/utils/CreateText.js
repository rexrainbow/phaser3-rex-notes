const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new PhaserText(scene, 0, 0, '', styles);
        scene.add.existing(gameObject);
    }

    if (config) {
        gameObject.setText(config.text);
    }

    return gameObject;
}

export default CreateText;