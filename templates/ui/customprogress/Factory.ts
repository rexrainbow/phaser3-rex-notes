import CustomProgress from './CustomProgress';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('customProgress', function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new CustomProgress(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CustomProgress', CustomProgress);

export default CustomProgress;