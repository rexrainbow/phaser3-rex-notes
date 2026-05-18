import Tweaker from './Tweaker';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('tweaker', function(config?: any) {
    var gameObject = new Tweaker(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Tweaker', Tweaker);

export default Tweaker;