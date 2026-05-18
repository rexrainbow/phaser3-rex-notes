import Checkbox from './Checkbox';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('checkbox', function(x?: any, y?: any, width?: any, height?: any, color?: any, config?: any) {
    var gameObject = new Checkbox(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Checkbox', Checkbox);

export default Checkbox;