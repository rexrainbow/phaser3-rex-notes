import Sizer from './gameobjects/sizer/Sizer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexSizer', function (x, y, width, height) {
    return this.displayList.add(new Sizer(this.scene, x, y, width, height));
});
Phaser.GameObjects.GameObjectCreator.register('rexSizer', function (config) {       
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var sizer = new Sizer(this.scene, 0, 0, width, height);

    // set properties wo modify children
    sizer.syncChildrenEnable = false;    
    BuildGameObject(this.scene, sizer, config);
    // sync properties of children
    sizer.syncChildrenEnable = true;

    return sizer;
});

export default Sizer;