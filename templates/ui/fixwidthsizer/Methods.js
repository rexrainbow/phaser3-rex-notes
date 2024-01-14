import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import LayoutChildren from './LayoutChildren.js';
import HasWidthWrap from './HasWidthWrap.js';
import RunWidthWrap from './RunWidthWrap.js';
import HasHeightWrap from './HasHeightWrap.js';
import RunHeightWrap from './RunHeightWrap.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    hasWidthWrap: HasWidthWrap,
    runWidthWrap: RunWidthWrap,
    hasHeightWrap: HasHeightWrap,
    runHeightWrap: RunHeightWrap,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods
);

export default methods;