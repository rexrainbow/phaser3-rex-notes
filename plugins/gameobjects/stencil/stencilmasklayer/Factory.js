import StencilMaskLayer from './StencilMaskLayer.js';

export default function (children) {
    var gameObject = new StencilMaskLayer(this.scene, children);
    this.scene.add.existing(gameObject);
    return gameObject;
};
