import SplitPanels from './SplitPanels';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('splitPanels', function(config?: any) {
    var gameObject = new SplitPanels(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SplitPanels', SplitPanels);

export default SplitPanels;