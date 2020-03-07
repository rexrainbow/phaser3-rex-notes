import Pages from './Pages.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('pages', function (x, y, minWidth, minHeight, config) {
    var gameObject = new Pages(this.scene, x, y, minWidth, minHeight, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Pages', Pages);

export default Pages;