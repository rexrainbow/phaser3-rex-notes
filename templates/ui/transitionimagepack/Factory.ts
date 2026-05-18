import TransitionImagePack from './TransitionImagePack';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('transitionImagePack', function(x?: any, y?: any, texture?: any, frame?: any, config?: any) {
    var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TransitionImagePack', TransitionImagePack);

export default TransitionImagePack;