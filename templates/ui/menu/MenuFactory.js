import Menu from './Menu.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('menu', function (config) {
    return new Menu(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Menu', Menu);

export default Menu;