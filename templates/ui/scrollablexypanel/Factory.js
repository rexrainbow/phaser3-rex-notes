import ScrollableXYPanel from './ScrollableXYPanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollableXYPanel', function (config) {
    var gameObject = new ScrollableXYPanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollableXYPanel', ScrollableXYPanel);

export default ScrollableXYPanel;