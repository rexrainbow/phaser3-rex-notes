import Sprite from './Sprite';

export default function(x?: any, y?: any, texture?: any, frame?: any) {
    var gameObject = new Sprite(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};