import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetChildrenSizers from './GetChildrenSizers';
import ResetChildPosition from './ResetChildPosition';
import LayoutChildren from './LayoutChildren';
import RemoveChildCallback from './RemoveChildCallback';
import ChildrenMaskMethods from '../../../../plugins/gameobjects/container/containerlite/mask/ChildrenMaskMethods';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    resetChildPosition: ResetChildPosition,
    layoutChildren: LayoutChildren,
    removeChildCallback: RemoveChildCallback,
};

Object.assign(
    methods,
    ChildrenMaskMethods
);

export default methods;