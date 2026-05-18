import TitleLabel from './TitleLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('titleLabel', function(config?: any) {
    var gameObject = new TitleLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TitleLabel', TitleLabel);

export default TitleLabel;