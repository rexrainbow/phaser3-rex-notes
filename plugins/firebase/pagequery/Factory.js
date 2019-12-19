import PageQuery from './PageQuery.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('pageQuery', function (config) {
    return new PageQuery(config);
});

SetValue(window, 'RexPlugins.Fire.PageQuery', PageQuery);

export default PageQuery;