import AddChild from './AddChild.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js'

var methods = {
    addChild: AddChild,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
}

export default methods;