import Error from './Error.js';
import Failer from './Failer.js';
import Runner from './Runner.js';
import Succeeder from './Succeeder.js';
import Wait from './Wait.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('error', function (config) {
    return new Error(config);
});
ObjectFactory.register('failer', function (config) {
    return new Failer(config);
});
ObjectFactory.register('runner', function (config) {
    return new Runner(config);
});
ObjectFactory.register('succeeder', function (config) {
    return new Succeeder(config);
});
ObjectFactory.register('wait', function (config) {
    return new Wait(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Errror', Error);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Failer);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Runner);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Succeeder);
SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);

export {
    Error,
    Failer,
    Runner,
    Succeeder,
    Wait
};