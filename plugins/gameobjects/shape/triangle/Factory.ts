import Triangle from './Triangle';

export default function(x?: any, y?: any, width?: any, height?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new Triangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};