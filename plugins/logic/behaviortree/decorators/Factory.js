import Inverter from './Inverter.js';
import Limiter from './Limiter.js';
import MaxTime from './MaxTime.js';
import RepeatUntilFailure from './RepeatUntilFailure.js';
import RepeatUntilSuccess from './RepeatUntilSuccess.js';
import Repeater from './Repeater.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('inverter', function (config) {
    return new Inverter();
});
ObjectFactory.register('limiter', function (config) {
    return new Limiter();
});
ObjectFactory.register('maxTime', function (config) {
    return new MaxTime();
});
ObjectFactory.register('repeatUntilFailure', function (config) {
    return new RepeatUntilFailure(config);
});
ObjectFactory.register('repeatUntilSuccess', function (config) {
    return new RepeatUntilSuccess(config);
});
ObjectFactory.register('repeater', function (config) {
    return new Repeater(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Inverter', Inverter);
SetValue(window, 'RexPlugins.BehaviorTree.Limiter', Limiter);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', MaxTime);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', RepeatUntilFailure);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilSuccess', RepeatUntilSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.Repeater', Repeater);

export {
    Inverter,
    Limiter,
    MaxTime,
    RepeatUntilFailure,
    RepeatUntilSuccess,
    Repeater
};