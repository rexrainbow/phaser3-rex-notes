import SuccessAction from './SuccessAction.js';
import FailureAction from './FailureAction.js';
import Wait from './Wait.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('successAction', function (config) {
    return new SuccessAction(config);
});
ObjectFactory.register('failureAction', function (config) {
    return new FailureAction(config);
});
ObjectFactory.register('wait', function (config) {
    return new Wait(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.SuccessAction', SuccessAction);
SetValue(window, 'RexPlugins.BehaviorTree.FailureAction', FailureAction);
SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);

export {
    SuccessAction,
    FailureAction,
    Wait
};