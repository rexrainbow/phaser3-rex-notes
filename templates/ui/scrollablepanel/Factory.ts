import ScrollablePanel from './ScrollablePanel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('scrollablePanel', function(config?: any) {
    var gameObject = new ScrollablePanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollablePanel', ScrollablePanel);

export default ScrollablePanel;