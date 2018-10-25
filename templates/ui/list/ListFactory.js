import List from './List.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('list', function (config) {
    return new List(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.List', List);

export default List;