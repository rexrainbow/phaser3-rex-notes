import Curve from './Curve.js';

export default function (points, lineWidth, color, alpha, lineType) {
    var gameObject = new Curve(this.scene, points, lineWidth, color, alpha, lineType);
    this.scene.add.existing(gameObject);
    return gameObject;
};