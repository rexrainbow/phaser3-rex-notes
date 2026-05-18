import DynamicText from './DynamicText';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('dynamicText', function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new DynamicText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.DynamicText', DynamicText);

export default DynamicText;