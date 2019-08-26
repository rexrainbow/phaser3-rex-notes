import Tabs from './Tabs.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tabs', function (config) {
    var gameObject = new Tabs(this.scene, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Tabs', Tabs);

export default Tabs;