import StatesImage from './StatesImage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesImage', function (config) {
    var gameObject = new StatesImage(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesImage', StatesImage);

export default StatesImage;