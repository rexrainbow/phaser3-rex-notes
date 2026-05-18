import ImageInputLabel from './ImageInputLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('imageInputLabel', function(config?: any) {
    var gameObject = new ImageInputLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ImageInputLabel', ImageInputLabel);

export default ImageInputLabel;