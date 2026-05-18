import SetTexture from './SetTexture';
import Resize from './Resize';
import AddChild from './AddChild';
import RemoveChild from './RemoveChild';
import RemoveChildren from './RemoveChildren';
import GetLastAppendedChildren from './GetLastAppendedChildren';
import GetChildren from './GetChildren';
import TintMethods from './TintMethods';

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
}

Object.assign(
    methods,
    TintMethods
)

export default methods;