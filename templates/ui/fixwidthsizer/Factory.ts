import FixWidthSizer from './FixWidthSizer';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fixWidthSizer', function(x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
    var gameObject = new FixWidthSizer(this.scene, x, y, minWidth, minHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FixWidthSizer', FixWidthSizer);

export default FixWidthSizer;