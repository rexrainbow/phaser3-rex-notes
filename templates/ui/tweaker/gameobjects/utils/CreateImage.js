const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new PhaserImage(scene, 0, 0, '');
        scene.add.existing(gameObject);
    }

    if (config) {
        gameObject.setTexture(config.key, config.frame);
    }

    return gameObject;
}

export default CreateImage;