import ScrollablePanel from './ScrollablePanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollablePanel', function (config) {
    return new ScrollablePanel(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.ScrollablePanel', ScrollablePanel);

export default ScrollablePanel;