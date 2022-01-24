// Composites
import CreateSelectorNode from './composites/Selector.js';
import CreateSequenceNode from './composites/Sequence.js';
// Actions
import CreateWaitNode from './actions/Wait.js';
// Decorators
import CreateRepeatNode from './decorators/Repeat.js';
import CreateIfNode from './decorators/If';
import CreateCooldownNode from './decorators/Cooldown';

const CreateCompositeHandlers = {
    'selector': CreateSelectorNode,
    'sequence': CreateSequenceNode,
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