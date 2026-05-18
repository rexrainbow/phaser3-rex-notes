import Facebook from './Facebook';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('facebook', function(config?: any) {
    var gameObject = new Facebook(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Facebook', Facebook);

export default Facebook;