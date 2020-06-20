import EffectLayer from './EffectLayer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

export default function (config, addToScene) {
    var key = GetAdvancedValue(config, 'key', undefined);
    var x = GetAdvancedValue(config, 'x', undefined);
    var y = GetAdvancedValue(config, 'y', undefined);
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);

    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new EffectLayer(this.scene, key, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};