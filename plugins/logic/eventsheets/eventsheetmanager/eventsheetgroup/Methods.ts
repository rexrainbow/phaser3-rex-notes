import TreeMethods from './TreeMethods';
import AddTreeMethods from './AddTreeMethods';
import RemoveTreeMethods from './RemoveTreeMethods';
import TreeActiveStateMethods from './TreeActiveStateMethods';
import SaveLoadTreeMethods from './SaveLoadTreeMethods';
import StateMethods from './StateMethods';
import RunMethods from './RunMethods';
import StopMethods from './StopMethods';

var Methods = {};

Object.assign(
    Methods,
    TreeMethods,
    AddTreeMethods,
    RemoveTreeMethods,
    TreeActiveStateMethods,
    SaveLoadTreeMethods,
    StateMethods,
    RunMethods,
    StopMethods,
)

export default Methods;