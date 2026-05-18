import LineProgress from './LineProgress';

export default function(x?: any, y?: any, width?: any, height?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new LineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};