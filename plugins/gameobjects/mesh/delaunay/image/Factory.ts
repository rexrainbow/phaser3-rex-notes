import Image from './Image';

export default function(x?: any, y?: any, texture?: any, frame?: any, config?: any) {
    var gameObject = new Image(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};