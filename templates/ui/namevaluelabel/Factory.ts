import NameValueLabel from './NameValueLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('nameValueLabel', function(config?: any) {
    var gameObject = new NameValueLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NameValueLabel', NameValueLabel);

export default NameValueLabel;