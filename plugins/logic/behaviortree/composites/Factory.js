import MemSelector from './MemSelector.js';
import MemSequence from './MemSequence.js';
import Selector from './Selector.js';
import Sequence from './Sequence.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('memSelector', function (config) {
    return new MemSelector(config);
});
ObjectFactory.register('memSequence', function (config) {
    return new MemSequence(config);
});
ObjectFactory.register('Ppriority', function (config) {
    return new Selector(config);
});
ObjectFactory.register('sequence', function (config) {
    return new Sequence(config);
});

SetValue(window, 'RexPlugins.Behavior3Js.MemSelector', MemSelector);
SetValue(window, 'RexPlugins.Behavior3Js.MemSequence', MemSequence);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Selector);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Sequence);

export {
    MemSelector,
    MemSequence,
    Selector,
    Sequence
};