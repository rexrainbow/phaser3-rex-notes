import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import _layout from './Layout.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ResetGrid from './ResetGrid.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    _layout: _layout,

    resetGrid: ResetGrid
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;