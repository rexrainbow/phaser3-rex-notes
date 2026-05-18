import HiddenEdit from './HiddenEdit';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('hiddenEdit', function(textObject?: any, config?: any) {
    var gameObject = new HiddenEdit(textObject, config);
    // Note: Don't add this game object into scene
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.HiddenEdit', HiddenEdit);

export default HiddenEdit;