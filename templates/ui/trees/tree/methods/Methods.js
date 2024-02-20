import ParentMethods from './ParentMethods.js';
import AddNodeMethods from './AddNodeMethods.js';
import RemoveNodeMethods from './RemoveNodeMethods.js';

var methods = {
}

Object.assign(
    methods,

    ParentMethods,
    AddNodeMethods,
    RemoveNodeMethods,

)

export default methods;