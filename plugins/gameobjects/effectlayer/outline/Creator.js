import OutlineEffectLayer from './OutlineEffectLayer.js';

export default function (config, addToScene) {
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new OutlineEffectLayer(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};