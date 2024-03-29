import StatesNinePatch from './StatesNinePatch.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesNinePatch', function (config) {
    var gameObject = new StatesNinePatch(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesNinePatch', StatesNinePatch);

export default StatesNinePatch;