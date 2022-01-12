import Bypass from './Bypass.js';
import Invert from './Invert.js';
import Limiter from './Limiter.js';
import MaxTime from './MaxTime.js';
import RepeatUntilFailure from './RepeatUntilFailure.js';
import RepeatUntilSuccess from './RepeatUntilSuccess.js';
import Repeat from './Repeat.js';
import If from './If.js';

import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('bypass', function (config) {
    return new Bypass(config);
});
ObjectFactory.register('invert', function (config) {
    return new Invert(config);
});
ObjectFactory.register('limiter', function (config) {
    return new Limiter(config);
});
ObjectFactory.register('maxTime', function (config) {
    return new MaxTime(config);
});
ObjectFactory.register('repeatUntilFailure', function (config) {
    return new RepeatUntilFailure(config);
});
ObjectFactory.register('repeatUntilSuccess', function (config) {
    return new RepeatUntilSuccess(config);
});
ObjectFactory.register('repeat', function (config) {
    return new Repeat(config);
});
ObjectFactory.register('if', function (config) {
    return new If(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Bypass', Bypass);
SetValue(window, 'RexPlugins.BehaviorTree.Invert', Invert);
SetValue(window, 'RexPlugins.BehaviorTree.Limiter', Limiter);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', MaxTime);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', RepeatUntilFailure);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilSuccess', RepeatUntilSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.Repeat', Repeat);
SetValue(window, 'RexPlugins.BehaviorTree.If', If);

export {
    Bypass,
    Invert,
    Limiter,
    MaxTime,
    RepeatUntilFailure,
    RepeatUntilSuccess,
    Repeat,
    If
};