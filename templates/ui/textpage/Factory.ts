import TextPage from './TextPage';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textPage', function(gameObject?: any, config?: any) {
    return new TextPage(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextPage', TextPage);

export default TextPage;