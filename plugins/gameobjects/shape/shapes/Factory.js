import Shapes from './Shapes.js';

export default function (x, y, width, height, config) {
    var gameObject = new Shapes(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};