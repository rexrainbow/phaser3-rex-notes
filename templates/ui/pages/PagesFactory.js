import Pages from './Pages.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('pages', function (x, y, minWidth, minHeight, orientation) {
    return new Pages(this.scene, x, y, minWidth, minHeight, orientation);
});

SetValue(window, 'RexPlugins.UI.Pages', Pages);

export default Pages;