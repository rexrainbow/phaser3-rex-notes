import NinePatch from './NinePatch';

export default function(x?: any, y?: any, width?: any, height?: any, key?: any, baseFrame?: any, columns?: any, rows?: any, config?: any) {
    var gameObject = new NinePatch(this.scene, x, y, width, height, key, baseFrame, columns, rows, config);
    this.scene.add.existing(gameObject);
    return gameObject;
}