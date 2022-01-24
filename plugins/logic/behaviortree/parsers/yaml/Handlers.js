// Composites
import CreateSelectorNode from './composites/Selector.js';
import CreateRandomSelectorNode from './composites/RandomSelector.js';
import CreateSequenceNode from './composites/Sequence.js';
import CreateShuffleNode from './composites/ShuffleSelector.js';
// Actions
import CreateWaitNode from './actions/Wait.js';
// Decorators
import CreateRepeatNode from './decorators/Repeat.js';
import CreateIfNode from './decorators/If';
import CreateCooldownNode from './decorators/Cooldown';

const CreateCompositeHandlers = {
    'selector': CreateSelectorNode,
    'random-selector':CreateRandomSelectorNode,
    'sequence': CreateSequenceNode,
    'shuffle-selector':CreateShuffleNode,
}

const CreateActionHandlers = {
    'wait': CreateWaitNode
}

const CreateDecoratorHandles = {
    'repeat': CreateRepeatNode,
    'if': CreateIfNode,
    'cooldown': CreateCooldownNode,
};

export {
    CreateCompositeHandlers,
    CreateActionHandlers,
    CreateDecoratorHandles
}