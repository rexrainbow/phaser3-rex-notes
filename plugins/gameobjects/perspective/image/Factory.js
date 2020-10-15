import Image from './Image.js';

export default function (x, y, texture, frame) {
    var gameObject = new Image(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};