import BehaviorTree from './BehaviorTree';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('behaviorTree', function(config?: any) {
    return new BehaviorTree(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.BehaviorTree', BehaviorTree);

export {
    BehaviorTree,
};