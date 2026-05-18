import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetExpandedChildWidth from './GetExpandedChildWidth';
import GetExpandedChildHeight from './GetExpandedChildHeight';
import GetChildrenSizers from './GetChildrenSizers';
import LayoutChildren from './LayoutChildren';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    layoutChildren: LayoutChildren,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;