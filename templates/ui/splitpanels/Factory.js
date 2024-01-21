import SplitPanels from './SplitPanels.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('splitPanels', function (config) {
    var gameObject = new SplitPanels(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SplitPanels', SplitPanels);

export default SplitPanels;