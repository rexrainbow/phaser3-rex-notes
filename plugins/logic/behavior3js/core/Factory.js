import BehaviorTree from './BehaviorTree';
import Blackboard from './Blackboard';
import Composite from './Composite';
import Decorator from './Decorator';
import Action from './Action';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('behaviorTree', function (config) {
    return new BehaviorTree(config);
});
ObjectFactory.register('blackboard', function (config) {
    return new Blackboard(config);
});

SetValue(window, 'RexPlugins.Behavior3Js.BehaviorTree', BehaviorTree);
SetValue(window, 'RexPlugins.Behavior3Js.Blackboard', Blackboard);
SetValue(window, 'RexPlugins.Behavior3Js.Composite', Composite);
SetValue(window, 'RexPlugins.Behavior3Js.Decorator', Decorator);
SetValue(window, 'RexPlugins.Behavior3Js.Action', Action);

export {
    BehaviorTree,
    Blackboard,
    Composite,
    Decorator,
    Action
};