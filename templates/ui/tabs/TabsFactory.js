import Tabs from './Tabs.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tabs', function (config) {
    return new Tabs(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Tabs', Tabs);

export default Tabs;