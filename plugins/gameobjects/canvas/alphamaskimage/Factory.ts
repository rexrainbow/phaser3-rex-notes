import AlphaMaskImage from './AlphaMaskImage';

export default function(x?: any, y?: any, key?: any, frame?: any, config?: any) {
    var gameObject = new AlphaMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};