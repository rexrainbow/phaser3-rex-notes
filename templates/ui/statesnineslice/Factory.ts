import StatesNineSlice from './StatesNineSlice';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesNineSlice', function(config?: any) {
    var gameObject = new StatesNineSlice(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesNineSlice', StatesNineSlice);

export default StatesNineSlice;