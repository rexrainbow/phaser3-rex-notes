import Blackboard from './Blackboard';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('blackboard', function(config?: any) {
    return new Blackboard(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Blackboard', Blackboard);

export {
    Blackboard,
};