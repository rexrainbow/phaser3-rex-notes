import LoadYaml from './LoadYaml';

import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../../utils/object/SetValue';

ObjectFactory.register('yaml', function(yamlString?: any, customNodeHandlers?: any) {
    return LoadYaml(yamlString, customNodeHandlers);
});

SetValue(window, 'RexPlugins.BehaviorTree.LoadYaml', LoadYaml);

export {
    LoadYaml,
};