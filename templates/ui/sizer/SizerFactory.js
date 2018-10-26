import Sizer from './Sizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('sizer', function (x, y, minWidth, minHeight, config) {
    return this.scene.sys.displayList.add(new Sizer(this.scene, x, y, minWidth, minHeight, config));
});

SetValue(window, 'RexPlugins.UI.Sizer', Sizer);

export default Sizer;