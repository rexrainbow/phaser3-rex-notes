import Shapes from './Shapes.js';

export default function (x, y, width, height) {
    var gameObject = new Shapes(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};