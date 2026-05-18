import Quad from './Quad';

export default function(x?: any, y?: any, width?: any, height?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new Quad(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};