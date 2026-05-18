import Image from './Image';

export default function(x?: any, y?: any, texture?: any, frame?: any) {
    var gameObject = new Image(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};