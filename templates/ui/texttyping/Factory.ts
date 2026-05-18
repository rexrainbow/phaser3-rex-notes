import TextTyping from './TextTyping';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textTyping', function(gameObject?: any, config?: any) {
    return new TextTyping(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextTyping', TextTyping);

export default TextTyping;