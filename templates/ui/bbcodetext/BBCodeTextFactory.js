import BBCodeText from './BBCodeText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('BBCodeText', function (x, y, width, height, children) {
    var text = new BBCodeText(this.scene, x, y, width, height, children);
    this.scene.sys.displayList.add(text);
    return text;
});

SetValue(window, 'RexPlugins.UI.BBCodeText', BBCodeText);

export default BBCodeText;