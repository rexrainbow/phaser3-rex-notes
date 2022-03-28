import AddImage from './AddImage.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js'

var methods = {
    addImage: AddImage,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
}

export default methods;