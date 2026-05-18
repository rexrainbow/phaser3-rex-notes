import PerspectiveCard from './PerspectiveCard';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('perspectiveCard', function(config?: any) {
    var gameObject = new PerspectiveCard(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.PerspectiveCard', PerspectiveCard);

export default PerspectiveCard;