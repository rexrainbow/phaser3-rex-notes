import Blackboard from './Blackboard.js';
import ContextMemoryBase from './ContextMemoryBase.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('blackboard', function (config) {
    return new Blackboard(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Blackboard', Blackboard);
SetValue(window, 'RexPlugins.BehaviorTree.ContextMemoryBase', ContextMemoryBase);

export {
    Blackboard,
};