import BBCodeText from './BBCodeText';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('BBCodeText', function(x?: any, y?: any, text?: any, style?: any) {
    var gameObject = new BBCodeText(this.scene, x, y, text, style);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.BBCodeText', BBCodeText);

export default BBCodeText;