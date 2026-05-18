import CircularProgress from './CircularProgress';

export default function(x?: any, y?: any, radius?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new CircularProgress(this.scene, x, y, radius, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};