// Composites
import CreateSelectorNode from './composites/Selector.js';
import CreateRandomSelectorNode from './composites/RandomSelector.js';
import CreateSequenceNode from './composites/Sequence.js';
import CreateShuffleNode from './composites/ShuffleSelector.js';
// Actions
import CreateWaitNode from './actions/Wait.js';
// Decorators
import CreateRepeatNode from './decorators/Repeat.js';
import CreateIfNode from './decorators/If.js';
import CreateCooldownNode from './decorators/Cooldown.js';
import CreateTimeLimitNode from './decorators/TimeLimit.js';
import CreateInvertNode from './decorators/Invert.js';
import CreateForceSuccessNode from './decorators/ForceSuccess.js';

const CreateCompositeHandlers = {
    'selector': CreateSelectorNode,
    'random-selector': CreateRandomSelectorNode,
    'sequence': CreateSequenceNode,
    'shuffle-selector': CreateShuffleNode,
}

const CreateActionHandlers = {
    'wait': CreateWaitNode
}

const CreateDecoratorHandles = {
    'repeat': CreateRepeatNode,
    'if': CreateIfNode,
    'cooldown': CreateCooldownNode,
    'time-limit': CreateTimeLimitNode,
    'invert': CreateInvertNode,
    'force-true': CreateForceSuccessNode,
    'force-success': CreateForceSuccessNode
};

export {
    CreateCompositeHandlers,
    CreateActionHandlers,
    CreateDecoratorHandles
}