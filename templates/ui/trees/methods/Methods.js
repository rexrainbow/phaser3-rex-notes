import AddTreeMethods from './AddTreeMethods.js';
import RemoveTreeMethods from './RemoveTreeMethods.js';
import GetTreeMethods from './GetTreeMethods.js';

var methods = {};

Object.assign(
    methods,
    AddTreeMethods,
    RemoveTreeMethods,
    GetTreeMethods,
)

export default methods;