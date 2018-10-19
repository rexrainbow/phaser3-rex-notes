import Sizer from './gameobjects/sizer/Sizer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class SizerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexSizer', this.addContainer, this.makeContainer);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addContainer(x, y, width, height) {
        return this.displayList.add(new Sizer(this.scene, x, y, width, height));
    }

    makeContainer(config) {
        var width = GetAdvancedValue(config, 'width', 1);
        var height = GetAdvancedValue(config, 'height', width);
        var sizer = new Sizer(this.scene, 0, 0, width, height);

        // set properties wo modify children
        sizer.syncChildrenEnable = false;
        BuildGameObject(this.scene, sizer, config);
        // sync properties of children
        sizer.syncChildrenEnable = true;
        
        return sizer;
    }

}

export default SizerPlugin;