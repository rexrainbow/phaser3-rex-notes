import Wait from './Wait.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';


ObjectFactory.register('wait', function (config) {
    return new Wait(config);
});

SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);

export {
    Wait
};