import Quad from './Quad.js';

export default function (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new Quad(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};