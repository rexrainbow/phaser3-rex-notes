import CircleMaskImage from './CircleMaskImage';

export default function(x?: any, y?: any, key?: any, frame?: any, config?: any) {
    var gameObject = new CircleMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};