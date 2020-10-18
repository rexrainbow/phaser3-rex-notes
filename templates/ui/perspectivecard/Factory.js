import PerspectiveCard from './PerspectiveCard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('roundRectangle', function (x, y, config) {
    var gameObject = new PerspectiveCard(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.PerspectiveCard', PerspectiveCard);

export default PerspectiveCard;