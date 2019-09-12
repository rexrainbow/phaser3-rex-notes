import NinePatch from './NinePatch.js';

export default function (x, y, width, height, key, columns, rows) {
    var gameObject = new NinePatch(this.scene, x, y, width, height, key, columns, rows);
    this.scene.add.existing(gameObject);
    return gameObject;
}