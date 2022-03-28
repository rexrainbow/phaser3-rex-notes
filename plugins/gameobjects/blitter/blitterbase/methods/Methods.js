import AddChild from './AddChild.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js';
import PopReusedBob from './PopReusedBob.js';

var methods = {
    addChild: AddChild,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    popReusedBob: PopReusedBob,
}

export default methods;