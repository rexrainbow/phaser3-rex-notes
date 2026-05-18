import StatesNinePatch from './StatesNinePatch';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesNinePatch', function(config?: any) {
    var gameObject = new StatesNinePatch(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesNinePatch', StatesNinePatch);

export default StatesNinePatch;