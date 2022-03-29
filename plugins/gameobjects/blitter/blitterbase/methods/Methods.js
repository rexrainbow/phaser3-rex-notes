import SetTexture from './SetTexture.js';
import Resize from './Resize.js';
import AddChild from './AddChild.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js';
import GetChildren from './GetChildren.js';
import PopReusedBob from './PopReusedBob.js';

var methods = {
    setTexture: SetTexture,
    resize: Resize,
    setSize: Resize,
    addChild: AddChild,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getChildren: GetChildren,
    popReusedBob: PopReusedBob,
}

export default methods;