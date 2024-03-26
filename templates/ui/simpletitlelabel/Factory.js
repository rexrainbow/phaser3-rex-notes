import SimpleTitleLabel from './SimpleTitleLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleTitleLabel', function (config, creators) {
    var gameObject = new SimpleTitleLabel(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleTitleLabel', SimpleTitleLabel);

export default SimpleTitleLabel;