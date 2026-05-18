import Sizer from './Sizer';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('sizer', function(x?: any, y?: any, minWidth?: any, minHeight?: any, orientation?: any, config?: any) {
    var gameObject = new Sizer(this.scene, x, y, minWidth, minHeight, orientation, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Sizer', Sizer);

export default Sizer;