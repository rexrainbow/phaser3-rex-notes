import PauseEventSheetMethods from './PauseEventSheetMethods.js';
import TreeMethods from './TreeMethods.js';
import AddTreeMethods from './AddTreeMethods.js';
import RemoveTreeMethods from './RemoveTreeMethods.js';
import TreeActiveStateMethods from './TreeActiveStateMethods.js';
import SaveLoadTreesMethods from './SaveLoadTreesMethods.js';
import DataMethods from './DataMethods.js';
import StateMethods from './StateMethods';
import ValueConvertMethods from './ValueConvertMethods';
import RunMethods from './RunMethods.js';
import StopMethods from './StopMethods.js';
import BindEventMethods from './BindEventMethods.js';
import RoundCounterMethods from './RoundCounterMethods.js';

var Methods = {};

Object.assign(
    Methods,
    PauseEventSheetMethods,
    TreeMethods,
    AddTreeMethods,
    RemoveTreeMethods,
    TreeActiveStateMethods,
    SaveLoadTreesMethods,
    DataMethods,
    StateMethods,
    ValueConvertMethods,
    RunMethods,
    StopMethods,
    BindEventMethods,
    RoundCounterMethods,
)

export default Methods;