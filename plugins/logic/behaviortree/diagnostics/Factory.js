import Logger from './logger/Logger.js';
import Tracer from './tracer/Tracer.js';
import BBCodeSink from './logger/sinks/BBCodeSink.js';

import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

// Logger
ObjectFactory.register('logger', function (config) {
    return new Logger(config);
});
// Tracer
ObjectFactory.register('tracer', function (config) {
    return new Tracer(config);
});


SetValue(window, 'RexPlugins.BehaviorTree.Logger', Logger);
SetValue(window, 'RexPlugins.BehaviorTree.Tracer', Tracer);
SetValue(window, 'RexPlugins.BehaviorTree.BBCodeSink', BBCodeSink);

export {
    Logger,
    Tracer,
    BBCodeSink,
};
