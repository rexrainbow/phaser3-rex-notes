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

    addContainer(x, y, minWidth, minHeight, config) {
        return this.displayList.add(new Sizer(this.scene, x, y, minWidth, minHeight, config));
    }

    makeContainer(config) {
        var minWidth = GetAdvancedValue(config, 'minWidth', 1);
        var minHeight = GetAdvancedValue(config, 'minHeight', minWidth);
        var sizer = new Sizer(this.scene, 0, 0, minWidth, minHeight);

        // set properties wo modify children
        sizer.syncChildrenEnable = false;
        BuildGameObject(this.scene, sizer, config);
        // sync properties of children
        sizer.syncChildrenEnable = true;
        
        return sizer;
    }

}

export default SizerPlugin;