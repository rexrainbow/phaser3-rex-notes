import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import LayoutChildren from './LayoutChildren.js';
import HasWidthWrap from './HasWidthWrap.js';
import RunWidthWrap from './RunWidthWrap.js';
import HasHeightWrap from './HasHeightWrap.js';
import RunHeightWrap from './RunHeightWrap.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods.js';

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
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,

};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods,
    SortChildrenMethods
);

export default methods;