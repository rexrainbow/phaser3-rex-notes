import TitleLabel from '../gameobjects/label/Title.js'

var CreateTitleLabel = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new TitleLabel(scene, style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateTitleLabel;