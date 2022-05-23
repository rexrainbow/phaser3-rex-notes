import MergeStyle from './utils/MergeStyle.js';

const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new PhaserText(scene, 0, 0, data.text, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateText;