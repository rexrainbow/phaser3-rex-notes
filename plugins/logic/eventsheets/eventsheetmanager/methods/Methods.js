import TreeMethods from './TreeMethods.js';
import DataMethods from './DataMethods.js';
import StateMethods from './StateMethods';
import ValueConvertMethods from './ValueConvertMethods';
import RunMethods from './RunMethods.js';
import RoundCounterMethods from './RoundCounterMethods.js';

var Methods = {};

Object.assign(
    Methods,
    TreeMethods,
    DataMethods,
    StateMethods,
    ValueConvertMethods,
    RunMethods,
    RoundCounterMethods,
)

export default Methods;