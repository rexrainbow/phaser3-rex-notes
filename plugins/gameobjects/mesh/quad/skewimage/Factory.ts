import SkewImage from './SkewImage';

export default function(x?: any, y?: any, texture?: any, frame?: any) {
    var gameObject = new SkewImage(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};