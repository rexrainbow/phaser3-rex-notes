import TextArea from './TextArea.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textArea', function (config) {
    return new TextArea(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.TextArea', TextArea);

export default TextArea;