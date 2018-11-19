import MenuTree from './MenuTree.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('menuTree', function (config) {
    return new MenuTree(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.MenuTree', MenuTree);

export default MenuTree;