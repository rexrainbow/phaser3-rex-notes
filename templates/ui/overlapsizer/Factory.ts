import OverlapSizer from './OverlapSizer';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('overlapSizer', function(x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
    var gameObject = new OverlapSizer(this.scene, x, y, minWidth, minHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.OverlapSizer', OverlapSizer);

export default OverlapSizer;