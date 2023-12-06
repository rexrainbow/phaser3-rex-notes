import RepeatImage from './RepeatImage.js';

export default function (x, y, width, height, key, frame) {
    var gameObject = new RepeatImage(this.scene, x, y, width, height, key, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};