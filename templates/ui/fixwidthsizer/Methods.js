import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import _layout from './Layout.js';
import _layoutInit from './_layoutInit.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    _layout: _layout,
    _layoutInit: _layoutInit
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;