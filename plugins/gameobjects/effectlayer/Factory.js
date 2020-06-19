import EffectLayer from './EffectLayer.js';

export default function (key) {
    var gameObject = new EffectLayer(this.scene, key);
    this.scene.add.existing(gameObject);
    return gameObject;
};