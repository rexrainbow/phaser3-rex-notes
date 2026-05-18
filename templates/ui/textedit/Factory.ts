import TextEdit from './TextEdit';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textEdit', function(gameObject?: any, config?: any) {
    return new TextEdit(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextEdit', TextEdit);

export default TextEdit;