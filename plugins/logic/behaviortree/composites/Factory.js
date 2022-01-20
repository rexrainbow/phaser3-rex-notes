import Selector from './Selector.js';
import Sequence from './Sequence.js';
import SimpleParallel from './SimpleParallel.js';
import IfBranch from './IfBranch.js';
import Switch from './Switch.js';
import WeightSelector from './WeightSelector.js';

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
ObjectFactory.register('ifBranch', function (config) {
    return new IfBranch(config);
});
ObjectFactory.register('switch', function (config) {
    return new Switch(config);
});
ObjectFactory.register('weightSelector', function (config) {
    return new WeightSelector(config);
});


SetValue(window, 'RexPlugins.BehaviorTree.Selector', Selector);
SetValue(window, 'RexPlugins.BehaviorTree.Sequence', Sequence);
SetValue(window, 'RexPlugins.BehaviorTree.SimpleParallel', SimpleParallel);
SetValue(window, 'RexPlugins.BehaviorTree.IfBranch', IfBranch);
SetValue(window, 'RexPlugins.BehaviorTree.Switch', Switch);
SetValue(window, 'RexPlugins.BehaviorTree.WeightSelector', WeightSelector);

export {
    Selector,
    Sequence,
    SimpleParallel,
    IfBranch,
    Switch,
    WeightSelector
};