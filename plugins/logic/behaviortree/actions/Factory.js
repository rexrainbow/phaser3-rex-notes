import Succeeder from './Succeeder.js';
import Failer from './Failer.js';
import Runner from './Runner.js';
import Error from './Error.js';
import Wait from './Wait.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('successAction', function (config) {
    return new Succeeder(config);
});
ObjectFactory.register('failureAction', function (config) {
    return new Failer(config);
});
ObjectFactory.register('runningAction', function (config) {
    return new Runner(config);
});
ObjectFactory.register('errorAction', function (config) {
    return new Error(config);
});
ObjectFactory.register('wait', function (config) {
    return new Wait(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Succeeder', Succeeder);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Failer);
SetValue(window, 'RexPlugins.BehaviorTree.Runner', Runner);
SetValue(window, 'RexPlugins.BehaviorTree.Error', Error);
SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);

export {
    Succeeder,
    Failer,
    Runner,
    Error,
    Wait
};