import TreeMethods from './TreeMethods.js';
import AddTreeMethods from './AddTreeMethods.js';
import RemoveTreeMethods from './RemoveTreeMethods.js';
import TreeActiveStateMethods from './TreeActiveStateMethods.js';
import SaveLoadTreeMethods from './SaveLoadTreeMethods.js';
import StateMethods from './StateMethods.js';
import RunMethods from './RunMethods.js';

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
)

export default Methods;