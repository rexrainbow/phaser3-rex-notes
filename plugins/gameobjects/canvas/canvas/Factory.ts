import Canvas from './Canvas';

export default function(x?: any, y?: any, width?: any, height?: any, resolution?: any) {
    var gameObject = new Canvas(this.scene, x, y, width, height, resolution);
    this.scene.add.existing(gameObject);
    return gameObject;
};