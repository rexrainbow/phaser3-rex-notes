import DynamicCanvasText from './DynamicCanvasText.js';

export default function (x, y, width, height, config) {
    var gameObject = new DynamicCanvasText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};