import SimpleLabel from './SimpleLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('simpleLabel', function(config?: any, creators?: any) {
    var gameObject = new SimpleLabel(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleLabel', SimpleLabel);

export default SimpleLabel;