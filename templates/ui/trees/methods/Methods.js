import PointToChild from './PointToChild.js';
import SetChildrenInteractive from './SetChildrenInteractive.js';

import AddTreeMethods from './AddTreeMethods.js';
import RemoveTreeMethods from './RemoveTreeMethods.js';
import GetTreeMethods from './GetTreeMethods.js';

var methods = {
    pointToChild: PointToChild,
    setChildrenInteractive: SetChildrenInteractive,
};

Object.assign(
    methods,
    AddTreeMethods,
    RemoveTreeMethods,
    GetTreeMethods,
)

export default methods;