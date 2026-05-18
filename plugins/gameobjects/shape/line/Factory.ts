import Line from './Line';

export default function(points?: any, lineWidth?: any, color?: any, alpha?: any, lineType?: any) {
    var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);
    this.scene.add.existing(gameObject);
    return gameObject;
};