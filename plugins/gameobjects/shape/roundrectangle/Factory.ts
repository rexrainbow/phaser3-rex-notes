import RoundRectangle from './RoundRectangle';

export default function(x?: any, y?: any, width?: any, height?: any, radiusConfig?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
};