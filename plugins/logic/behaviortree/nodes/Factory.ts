import BaseNode from './BaseNode';
import Action from './Action';
import Composite from './Composite';
import Decorator from './Decorator';
import Service from './Service';

import Succeeder from './actions/Succeeder';
import Failer from './actions/Failer';
import Runner from './actions/Runner';
import Error from './actions/Error';
import Wait from './actions/Wait';
import Abort from './actions/Abort';
import BreakAction from './actions/BreakAction';

import Selector from './composites/Selector';
import Sequence from './composites/Sequence';
import Parallel from './composites/Parallel';
import IfSelector from './composites/IfSelector';
import SwitchSelector from './composites/SwitchSelector';
import WeightSelector from './composites/WeightSelector';
import RandomSelector from './composites/RandomSelector';
import ShuffleSelector from './composites/ShuffleSelector';

import Bypass from './decorators/Bypass';
import ForceSuccess from './decorators/ForceSuccess';
import ForceFailure from './decorators/ForceFailure';
import Invert from './decorators/Invert';
import TimeLimit from './decorators/TimeLimit';
import Cooldown from './decorators/Cooldown';
import Repeat from './decorators/Repeat';
import RepeatUntilFailure from './decorators/RepeatUntilFailure';
import RepeatUntilSuccess from './decorators/RepeatUntilSuccess';
import Limiter from './decorators/Limiter';
import If from './decorators/If';
import ContinueIf from './decorators/ContinueIf';
import AbortIf from './decorators/AbortIf';
import BreakDecorator from './decorators/BreakDecorator';

import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

// Actions
ObjectFactory.register('successAction', function(config?: any) {
    return new Succeeder(config);
});
ObjectFactory.register('failureAction', function(config?: any) {
    return new Failer(config);
});
ObjectFactory.register('runningAction', function(config?: any) {
    return new Runner(config);
});
ObjectFactory.register('errorAction', function(config?: any) {
    return new Error(config);
});
ObjectFactory.register('wait', function(config?: any) {
    return new Wait(config);
});
ObjectFactory.register('abort', function(config?: any) {
    return new Abort(config);
});
ObjectFactory.register('breakAction', function(config?: any) {
    return new BreakAction(config);
});

// Composites
ObjectFactory.register('selector', function(config?: any) {
    return new Selector(config);
});
ObjectFactory.register('sequence', function(config?: any) {
    return new Sequence(config);
});
ObjectFactory.register('parallel', function(config?: any) {
    return new Parallel(config);
});
ObjectFactory.register('ifSelector', function(config?: any) {
    return new IfSelector(config);
});
ObjectFactory.register('switchSelector', function(config?: any) {
    return new SwitchSelector(config);
});
ObjectFactory.register('weightSelector', function(config?: any) {
    return new WeightSelector(config);
});
ObjectFactory.register('randomSelector', function(config?: any) {
    return new RandomSelector(config);
});
ObjectFactory.register('shuffleSelector', function(config?: any) {
    return new ShuffleSelector(config);
});

// Decorators
ObjectFactory.register('bypass', function(config?: any) {
    return new Bypass(config);
});
ObjectFactory.register('forceSuccess', function(config?: any) {
    return new ForceSuccess(config);
});
ObjectFactory.register('forceFailure', function(config?: any) {
    return new ForceFailure(config);
});
ObjectFactory.register('invert', function(config?: any) {
    return new Invert(config);
});
ObjectFactory.register('timeLimit', function(config?: any) {
    return new TimeLimit(config);
});
ObjectFactory.register('cooldown', function(config?: any) {
    return new Cooldown(config);
});
ObjectFactory.register('repeat', function(config?: any) {
    return new Repeat(config);
});
ObjectFactory.register('repeatUntilFailure', function(config?: any) {
    return new RepeatUntilFailure(config);
});
ObjectFactory.register('repeatUntilSuccess', function(config?: any) {
    return new RepeatUntilSuccess(config);
});
ObjectFactory.register('limiter', function(config?: any) {
    return new Limiter(config);
});
ObjectFactory.register('if', function(config?: any) {
    return new If(config);
});
ObjectFactory.register('continueIf', function(config?: any) {
    return new ContinueIf(config);
});
ObjectFactory.register('abortIf', function(config?: any) {
    return new AbortIf(config);
});
ObjectFactory.register('breakDecorator', function(config?: any) {
    return new BreakDecorator(config);
});


SetValue(window, 'RexPlugins.BehaviorTree.Action', Action);
SetValue(window, 'RexPlugins.BehaviorTree.Composite', Composite);
SetValue(window, 'RexPlugins.BehaviorTree.Decorator', Decorator);
SetValue(window, 'RexPlugins.BehaviorTree.Service', Service);

SetValue(window, 'RexPlugins.BehaviorTree.Succeeder', Succeeder);
SetValue(window, 'RexPlugins.BehaviorTree.Failer', Failer);
SetValue(window, 'RexPlugins.BehaviorTree.Runner', Runner);
SetValue(window, 'RexPlugins.BehaviorTree.Error', Error);
SetValue(window, 'RexPlugins.BehaviorTree.Wait', Wait);
SetValue(window, 'RexPlugins.BehaviorTree.Abort', Abort);
SetValue(window, 'RexPlugins.BehaviorTree.BreakAction', BreakAction);

SetValue(window, 'RexPlugins.BehaviorTree.Selector', Selector);
SetValue(window, 'RexPlugins.BehaviorTree.Sequence', Sequence);
SetValue(window, 'RexPlugins.BehaviorTree.Parallel', Parallel);
SetValue(window, 'RexPlugins.BehaviorTree.IfSelector', IfSelector);
SetValue(window, 'RexPlugins.BehaviorTree.SwitchSelector', SwitchSelector);
SetValue(window, 'RexPlugins.BehaviorTree.WeightSelector', WeightSelector);
SetValue(window, 'RexPlugins.BehaviorTree.RandomSelector', RandomSelector);
SetValue(window, 'RexPlugins.BehaviorTree.ShuffleSelector', ShuffleSelector);

SetValue(window, 'RexPlugins.BehaviorTree.Bypass', Bypass);
SetValue(window, 'RexPlugins.BehaviorTree.ForceSuccess', ForceSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.ForceFailure', ForceFailure);
SetValue(window, 'RexPlugins.BehaviorTree.Invert', Invert);
SetValue(window, 'RexPlugins.BehaviorTree.TimeLimit', TimeLimit);
SetValue(window, 'RexPlugins.BehaviorTree.Cooldown', Cooldown);
SetValue(window, 'RexPlugins.BehaviorTree.Repeat', Repeat);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilFailure', RepeatUntilFailure);
SetValue(window, 'RexPlugins.BehaviorTree.RepeatUntilSuccess', RepeatUntilSuccess);
SetValue(window, 'RexPlugins.BehaviorTree.Limiter', Limiter);
SetValue(window, 'RexPlugins.BehaviorTree.If', If);
SetValue(window, 'RexPlugins.BehaviorTree.ContinueIf', ContinueIf);
SetValue(window, 'RexPlugins.BehaviorTree.AbortIf', AbortIf);
SetValue(window, 'RexPlugins.BehaviorTree.BreakDecorator', BreakDecorator);


export {
    BaseNode,
    Composite,
    Decorator,
    Action,

    Succeeder,
    Failer,
    Runner,
    Error,
    Wait,
    Abort,
    BreakAction,

    Selector,
    Sequence,
    Parallel,
    IfSelector,
    SwitchSelector,
    WeightSelector,
    RandomSelector,
    ShuffleSelector,

    Bypass,
    ForceSuccess,
    ForceFailure,
    Invert,
    TimeLimit,
    Cooldown,
    Repeat,
    RepeatUntilFailure,
    RepeatUntilSuccess,
    Limiter,
    If,
    ContinueIf,
    AbortIf,
    BreakDecorator,
};