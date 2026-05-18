import TransitionImagePack from './TransitionImagePack';

export default function(x?: any, y?: any, texture?: any, frame?: any, config?: any) {
    var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};