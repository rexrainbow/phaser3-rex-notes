// Composites
import CreateSelectorNode from './composites/Selector';
import CreateSequenceNode from './composites/Sequence';
import CreateParallelNode from './composites/Parallel';
import CreateSwitchSelectorNode from './composites/SwitchSelector';
import CreateIfSelectorNode from './composites/IfSelector';
import CreateRandomSelectorNode from './composites/RandomSelector';
import CreateShuffleNode from './composites/ShuffleSelector';
import CreateWeightSelectorNode from './composites/WeightSelector';
// Actions
import CreateWaitNode from './actions/Wait';
// Decorators
import CreateRepeatNode from './decorators/Repeat';
import CreateRepeatUntilFailureNode from './decorators/RepeatUntilFailure';
import CreateRepeatUntilSuccessNode from './decorators/RepeatUntilSuccess';
import CreateIfNode from './decorators/If';
import CreateContinueIfNode from './decorators/ContinueIf';
import CreateAbortIfNode from './decorators/AbortIf';
import CreateCooldownNode from './decorators/Cooldown';
import CreateTimeLimitNode from './decorators/TimeLimit';
import CreateInvertNode from './decorators/Invert';
import CreateForceSuccessNode from './decorators/ForceSuccess';
import CreateForceFailureNode from './decorators/ForceFailure';

const CreateCompositeHandlers = {
    'selector': CreateSelectorNode,
    'sequence': CreateSequenceNode,
    'parallel': CreateParallelNode,
    'switch-selector': CreateSwitchSelectorNode,
    'if-selector': CreateIfSelectorNode,
    'random-selector': CreateRandomSelectorNode,
    'shuffle-selector': CreateShuffleNode,
    'weight-selector': CreateWeightSelectorNode,
}

const CreateActionHandlers = {
    'wait': CreateWaitNode
}

const CreateDecoratorHandles = {
    'repeat': CreateRepeatNode,
    'rpeeat-until-false': CreateRepeatUntilFailureNode,
    'repeat-until-true': CreateRepeatUntilSuccessNode,
    'if': CreateIfNode,
    'continue-if': CreateContinueIfNode,
    'abort-if': CreateAbortIfNode,
    'cooldown': CreateCooldownNode,
    'time-limit': CreateTimeLimitNode,
    'invert': CreateInvertNode,
    'force-true': CreateForceSuccessNode,
    'force-false': CreateForceFailureNode,
};

export {
    CreateCompositeHandlers,
    CreateActionHandlers,
    CreateDecoratorHandles
}