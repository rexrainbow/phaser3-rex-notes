import Cube from './Cube.js';

export default function (x, y, config) {
    var gameObject = new Cube(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};