import ImageBox from './ImageBox';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('imageBox', function(x?: any, y?: any, texture?: any, frame?: any, config?: any) {
    var gameObject = new ImageBox(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ImageBox', ImageBox);

export default ImageBox;