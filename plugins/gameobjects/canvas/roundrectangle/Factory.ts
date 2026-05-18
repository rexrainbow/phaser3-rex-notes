import RoundRectangle from './RoundRectangle';

export default function(x?: any, y?: any, width?: any, height?: any, radius?: any, fillStyle?: any, strokeStyle?: any, lineWidth?: any, fillColor2?: any, isHorizontalGradient?: any) {
    var gameObject = new RoundRectangle(this.scene, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    this.scene.add.existing(gameObject);
    return gameObject;
};