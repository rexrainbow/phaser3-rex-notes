import StencilLayer from './StencilLayer.js';

export default function (children) {
    var gameObject = new StencilLayer(this.scene, children);
    this.scene.add.existing(gameObject);
    return gameObject;
};