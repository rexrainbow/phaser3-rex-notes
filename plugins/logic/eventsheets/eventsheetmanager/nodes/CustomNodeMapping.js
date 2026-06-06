import BreakDecorator from './BreakDecorator.js';
import ContinueDecorator from './ContinueDecorator.js';
import BreakAction from './BreakAction.js';
import ContinueAction from './ContinueAction.js';
import TaskAction from './taskaction/TaskAction.js';
import ParameterExpression from './parameterexpression/ParameterExpression.js';
import ActivateAction from './ActivateAction.js';
import DeactivateAction from './DeactivateAction.js';
import LabelDecorator from './LabelDecorator.js';

export default {
    BreakDecorator: BreakDecorator,
    ContinueDecorator: ContinueDecorator,
    BreakAction: BreakAction,
    ContinueAction: ContinueAction,
    TaskAction: TaskAction,
    ParameterExpression: ParameterExpression,
    ActivateAction: ActivateAction,
    ActivateTree: ActivateAction,
    DeactivateAction: DeactivateAction,
    DeactivateTree: DeactivateAction,
    LabelDecorator: LabelDecorator,
    Label: LabelDecorator,
}
