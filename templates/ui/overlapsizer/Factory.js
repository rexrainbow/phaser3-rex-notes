import OverlapSizer from './OverlapSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('overlapSizer', function (x, y, minWidth, minHeight, config) {
    var gameObject = new OverlapSizer(this.scene, x, y, minWidth, minHeight, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.OverlapSizer', OverlapSizer);

export default OverlapSizer;