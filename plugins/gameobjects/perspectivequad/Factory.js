import PerspectiveQuad from './PerspectiveQuad.js';

export default function (x, y, frontKey, frontFrame, config) {
    var gameObject = new PerspectiveQuad(this.scene, x, y, frontKey, frontFrame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};