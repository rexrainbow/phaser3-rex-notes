import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import LayoutChildren from './LayoutChildren.js';
import ResolveWidth from './ResolveWidth.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;