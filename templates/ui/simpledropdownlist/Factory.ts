import SimpleDropDownList from './SimpleDropDownList';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('simpleDropDownList', function(config?: any, creators?: any) {
    var gameObject = new SimpleDropDownList(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleDropDownList', SimpleDropDownList);

export default SimpleDropDownList;