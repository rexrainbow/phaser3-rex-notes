import Tabs from './Tabs';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('tabs', function(config?: any) {
    var gameObject = new Tabs(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Tabs', Tabs);

export default Tabs;