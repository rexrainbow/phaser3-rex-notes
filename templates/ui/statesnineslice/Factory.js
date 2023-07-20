import StatesNineSlice from './StatesNineSlice.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesNineSlice', function (config) {
    var gameObject = new StatesNineSlice(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesNineSlice', StatesNineSlice);

export default StatesNineSlice;