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

SetValue(window, 'RexPlugins.Behavior3Js.Errror', Error);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Failer);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Runner);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Succeeder);
SetValue(window, 'RexPlugins.Behavior3Js.Wait', Wait);

export {
    Error,
    Failer,
    Runner,
    Succeeder,
    Wait
};