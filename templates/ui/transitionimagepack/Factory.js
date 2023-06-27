import TransitionImagePack from './TransitionImagePack.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('transitionImagePack', function (x, y, texture, frame, config) {
    var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TransitionImagePack', TransitionImagePack);

export default TransitionImagePack;