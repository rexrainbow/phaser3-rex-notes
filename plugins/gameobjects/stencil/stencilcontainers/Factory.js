import StencilContainers from './StencilContainers.js';

export default function (x, y, children) {
    var gameObject = new StencilContainers(this.scene, x, y, children);
    this.scene.add.existing(gameObject);
    return gameObject;
};
