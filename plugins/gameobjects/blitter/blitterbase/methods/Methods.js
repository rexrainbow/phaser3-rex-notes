import SetTexture from './SetTexture.js';
import Resize from './Resize.js';
import AddChild from './AddChild.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js';
import GetChildren from './GetChildren.js';
import PopReusedBob from './PopReusedBob.js';
import SetCrop from './SetCrop.js';

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
    setCrop: SetCrop
}

export default methods;