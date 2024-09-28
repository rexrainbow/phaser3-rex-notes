import PointToChild from './PointToChild.js';

import ParentMethods from './ParentMethods.js';
import AddNodeMethods from './AddNodeMethods.js';
import RemoveNodeMethods from './RemoveNodeMethods.js';
import GetNodeMethods from './GetNodeMethods.js';

var methods = {
    pointToChild: PointToChild,
}

Object.assign(
    methods,

    ParentMethods,
    AddNodeMethods,
    RemoveNodeMethods,
    GetNodeMethods,

)

export default methods;