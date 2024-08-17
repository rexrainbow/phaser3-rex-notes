import Canvas from './Canvas.js';

export default function (x, y, width, height, resolution) {
    var gameObject = new Canvas(this.scene, x, y, width, height, resolution);
    this.scene.add.existing(gameObject);
    return gameObject;
};