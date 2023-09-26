import ImageInputLabel from './ImageInputLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('imageInputLabel', function (config) {
    var gameObject = new ImageInputLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ImageInputLabel', ImageInputLabel);

export default ImageInputLabel;