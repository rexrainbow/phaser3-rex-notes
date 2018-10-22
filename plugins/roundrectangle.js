import RoundRectangle from './gameobjects/shape/roundrectangle/RoundRectangle.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexRoundRectangle', function (x, y, width, height, radiusConfig, fillColor, fillAlpha) {
    return this.displayList.add(new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha));
});
Phaser.GameObjects.GameObjectCreator.register('rexRoundRectangle', function (config) {       
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', width);
    var radiusConfig = GetValue(config, 'radius', undefined);
    var fillColor = GetAdvancedValue(config, 'fillColor', undefined);
    var fillAlpha = GetAdvancedValue(config, 'fillAlpha', undefined);
    var roundRectangle = new RoundRectangle(this.scene, 0, 0, width, height, radiusConfig, fillColor, fillAlpha);

    BuildGameObject(this.scene, roundRectangle, config);

    return roundRectangle;
});

export default RoundRectangle;