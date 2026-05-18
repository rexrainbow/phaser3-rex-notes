import BadgeLabel from './BadgeLabel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('badgeLabel', function(config?: any) {
    var gameObject = new BadgeLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.BadgeLabel', BadgeLabel);

export default BadgeLabel;