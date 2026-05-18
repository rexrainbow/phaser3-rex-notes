import Buttons from './Buttons';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('buttons', function(config?: any) {
    var gameObject = new Buttons(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Buttons', Buttons);

export default Buttons;