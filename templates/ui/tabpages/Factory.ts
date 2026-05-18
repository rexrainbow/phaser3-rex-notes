import TabPages from './TabPages';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('tabPages', function(config?: any) {
    var gameObject = new TabPages(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TabPages', TabPages);

export default TabPages;