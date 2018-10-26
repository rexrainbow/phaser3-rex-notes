import Sizer from './gameobjects/sizer/Sizer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexSizer', function (x, y, minWidth, minHeight, orientation, extend) {
    return this.displayList.add(new Sizer(this.scene, x, y, minWidth, minHeight, orientation, extend));
});
Phaser.GameObjects.GameObjectCreator.register('rexSizer', function (config) {       
    var minWidth = GetAdvancedValue(config, 'minWidth', 1);
    var minHeight = GetAdvancedValue(config, 'minHeight', minWidth);
    var sizer = new Sizer(this.scene, 0, 0, minWidth, minHeight, config);

    // set properties wo modify children
    sizer.syncChildrenEnable = false;    
    BuildGameObject(this.scene, sizer, config);
    // sync properties of children
    sizer.syncChildrenEnable = true;

    return sizer;
});

export default Sizer;