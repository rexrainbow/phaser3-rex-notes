import InputText from './InputText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('inputText', function (x, y, width, height, config) {
    var inputText = new InputText(this.scene, x, y, width, height, config);
    this.scene.sys.displayList.add(inputText);
    return inputText;
});

SetValue(window, 'RexPlugins.UI.InputText', InputText);

export default InputText;