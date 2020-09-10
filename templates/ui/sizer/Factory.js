import Sizer from './Sizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('sizer', function (x, y, minWidth, minHeight, orientation, config) {
    var gameObject = new Sizer(this.scene, x, y, minWidth, minHeight, orientation, config);
    this.displayList.add(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Sizer', Sizer);

export default Sizer;