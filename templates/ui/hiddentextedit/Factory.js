import HiddenTextEdit from './HiddenTextEdit.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('hiddenTextEdit', function (textObject, config) {
    var gameObject = new HiddenTextEdit(textObject, config);
    // Note: Don't add this game object into scene
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.HiddenTextEdit', HiddenTextEdit);

export default HiddenTextEdit;