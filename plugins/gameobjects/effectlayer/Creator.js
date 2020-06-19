import EffectLayer from './EffectLayer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

export default function (config, addToScene) {
    var key = GetAdvancedValue(config, 'key', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new EffectLayer(this.scene, key);
    this.scene.add.existing(gameObject);
    return gameObject;
};