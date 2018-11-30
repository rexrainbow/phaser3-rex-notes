import RoundRectangle from './gameobjects/shape/roundrectangle/RoundRectangle.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class RoundRectanglePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangle', this.addRoundRectangle, this.makeRoundRectangle);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addRoundRectangle(x, y, width, height, radiusConfig, fillColor, fillAlpha) {
        var roundRectangle = new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha);
        this.displayList.add(roundRectangle);
        return roundRectangle;
    }

    makeRoundRectangle(config) {
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', width);
        var radiusConfig = GetValue(config, 'radius', undefined);
        var fillColor = GetAdvancedValue(config, 'fillColor', undefined);
        var fillAlpha = GetAdvancedValue(config, 'fillAlpha', undefined);
        var roundRectangle = new RoundRectangle(this.scene, 0, 0, width, height, radiusConfig, fillColor, fillAlpha);

        BuildGameObject(this.scene, roundRectangle, config);

        return roundRectangle;
    }

}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangle', RoundRectangle);

export default RoundRectanglePlugin;