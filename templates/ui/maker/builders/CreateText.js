import MergeStyle from './MergeStyle.js';
import Handlebars from 'handlebars';

const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var text = data.text;
    if (view !== undefined) {
        var template = Handlebars.compile(text);
        text = template(view);
    }
    var gameObjects = new PhaserText(scene, 0, 0, text, data);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateText;