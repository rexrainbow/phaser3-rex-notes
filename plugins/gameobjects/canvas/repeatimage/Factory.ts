import RepeatImage from './RepeatImage';

export default function(x?: any, y?: any, width?: any, height?: any, key?: any, frame?: any) {
    var gameObject = new RepeatImage(this.scene, x, y, width, height, key, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};