import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import _layout from './Layout.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveHeight from './ResolveHeight.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    _layout: _layout,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;