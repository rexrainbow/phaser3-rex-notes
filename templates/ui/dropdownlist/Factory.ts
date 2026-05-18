import DropDownList from './DropDownList';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('dropDownList', function(config?: any) {
    var gameObject = new DropDownList(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.DropDownList', DropDownList);

export default DropDownList;