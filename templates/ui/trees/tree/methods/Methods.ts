import PointToChild from './PointToChild';

import ParentMethods from './ParentMethods';
import AddNodeMethods from './AddNodeMethods';
import RemoveNodeMethods from './RemoveNodeMethods';
import GetNodeMethods from './GetNodeMethods';

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