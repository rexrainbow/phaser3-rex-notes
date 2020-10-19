import PerspectivePanel from './PerspectivePanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('pages', function (config) {
    var gameObject = new PerspectivePanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.PerspectivePanel', PerspectivePanel);

export default PerspectivePanel;