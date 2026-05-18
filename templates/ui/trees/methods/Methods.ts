import PointToChild from './PointToChild';
import SetChildrenInteractive from './SetChildrenInteractive';

import AddTreeMethods from './AddTreeMethods';
import RemoveTreeMethods from './RemoveTreeMethods';
import GetTreeMethods from './GetTreeMethods';

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