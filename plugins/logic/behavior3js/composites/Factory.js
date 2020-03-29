import MemPriority from './MemPriority.js';
import MemSequence from './MemSequence.js';
import Priority from './Priority.js';
import Sequence from './Sequence.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('memPriority', function (config) {
    return new MemPriority(config);
});
ObjectFactory.register('memSequence', function (config) {
    return new MemSequence(config);
});
ObjectFactory.register('Ppriority', function (config) {
    return new Priority(config);
});
ObjectFactory.register('sequence', function (config) {
    return new Sequence(config);
});

SetValue(window, 'RexPlugins.Behavior3Js.MemPriority', MemPriority);
SetValue(window, 'RexPlugins.Behavior3Js.MemSequence', MemSequence);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Priority);
SetValue(window, 'RexPlugins.Behavior3Js.Failer', Sequence);

export {
    MemPriority,
    MemSequence,
    Priority,
    Sequence
};