import PauseEventSheetMethods from './PauseEventSheetMethods';
import TreeMethods from './TreeMethods';
import AddTreeMethods from './AddTreeMethods';
import RemoveTreeMethods from './RemoveTreeMethods';
import TreeActiveStateMethods from './TreeActiveStateMethods';
import SaveLoadTreesMethods from './SaveLoadTreesMethods';
import DataMethods from './DataMethods';
import StateMethods from './StateMethods';
import ValueConvertMethods from './ValueConvertMethods';
import RunMethods from './RunMethods';
import StopMethods from './StopMethods';
import BindEventMethods from './BindEventMethods';
import RoundCounterMethods from './RoundCounterMethods';

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