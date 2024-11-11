import Line from './Line.js';

export default function (points, lineWidth, color, alpha, lineType) {
    var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);
    this.scene.add.existing(gameObject);
    return gameObject;
};