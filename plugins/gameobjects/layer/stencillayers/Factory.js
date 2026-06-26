import StencilLayers from './StencilLayers.js';

export default function () {
    var gameObject = new StencilLayers(this.scene);
    this.scene.add.existing(gameObject);
    return gameObject;
};
