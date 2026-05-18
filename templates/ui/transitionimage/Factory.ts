import TransitionImage from './TransitionImage';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('transitionImage', function(x?: any, y?: any, texture?: any, frame?: any, config?: any) {
    var gameObject = new TransitionImage(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TransitionImage', TransitionImage);

export default TransitionImage;