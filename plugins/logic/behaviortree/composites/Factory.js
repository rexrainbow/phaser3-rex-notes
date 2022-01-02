import Selector from './Selector.js';
import Sequence from './Sequence.js';
import SimpleParallel from './SimpleParallel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('selector', function (config) {
    return new Selector(config);
});
ObjectFactory.register('sequence', function (config) {
    return new Sequence(config);
});
ObjectFactory.register('simpleParallel', function (config) {
    return new SimpleParallel(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Selector', Selector);
SetValue(window, 'RexPlugins.BehaviorTree.Sequence', Sequence);
SetValue(window, 'RexPlugins.BehaviorTree.SimpleParallel', SimpleParallel);

export {
    Selector,
    Sequence,
    SimpleParallel
};