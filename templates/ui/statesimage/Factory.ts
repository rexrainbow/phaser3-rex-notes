import StatesImage from './StatesImage';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesImage', function(config?: any) {
    var gameObject = new StatesImage(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesImage', StatesImage);

export default StatesImage;