import ScrollablePanel from './ScrollablePanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollablePanel', function (config) {
    var gameObject = new ScrollablePanel(this.scene, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollablePanel', ScrollablePanel);

export default ScrollablePanel;