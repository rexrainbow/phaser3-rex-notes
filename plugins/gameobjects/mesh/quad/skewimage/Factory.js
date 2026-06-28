import SkewImage from './SkewImage.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new SkewImage(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};
