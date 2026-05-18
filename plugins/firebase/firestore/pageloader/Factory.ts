import PageLoader from './PageLoader';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('pageLoader', function(config?: any) {
    return new PageLoader(config);
});

SetValue(window, 'RexPlugins.Fire.PageLoader', PageLoader);

export default PageLoader;