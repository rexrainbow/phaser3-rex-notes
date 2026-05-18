import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetChildrenSizers from './GetChildrenSizers';
import PreLayout from './PreLayout';
import LayoutChildren from './LayoutChildren';
import HasWidthWrap from './HasWidthWrap';
import RunWidthWrap from './RunWidthWrap';
import HasHeightWrap from './HasHeightWrap';
import RunHeightWrap from './RunHeightWrap';
import GetExpandedChildWidth from './GetExpandedChildWidth';
import GetExpandedChildHeight from './GetExpandedChildHeight';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods';

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