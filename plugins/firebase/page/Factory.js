import Page from './Page.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('page', function (config) {
    return new Page(config);
});

SetValue(window, 'RexPlugins.Fire.Page', Page);

export default Page;