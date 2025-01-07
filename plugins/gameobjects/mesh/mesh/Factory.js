import Mesh from './Mesh.js';

export default function (x, y, texture, frame) {
    var gameObject = new Mesh(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};