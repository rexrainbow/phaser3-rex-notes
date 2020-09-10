import Menu from './Menu.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('menu', function (config) {
    var gameObject = new Menu(this.scene, config);
    this.displayList.add(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Menu', Menu);

export default Menu;