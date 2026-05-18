import SimpleTitleLabel from './SimpleTitleLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('simpleTitleLabel', function(config?: any, creators?: any) {
    var gameObject = new SimpleTitleLabel(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleTitleLabel', SimpleTitleLabel);

export default SimpleTitleLabel;