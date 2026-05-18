import CircleMaskImage from './CircleMaskImage';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('circleMaskImage', function(x?: any, y?: any, key?: any, frame?: any, config?: any) {
    var gameObject = new CircleMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircleMaskImage', CircleMaskImage);

export default CircleMaskImage;