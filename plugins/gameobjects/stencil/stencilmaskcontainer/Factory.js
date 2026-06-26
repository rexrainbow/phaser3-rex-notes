import StencilMaskContainer from './StencilMaskContainer.js';

export default function (x, y, children, config) {
    var gameObject = new StencilMaskContainer(this.scene, x, y, children, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};
