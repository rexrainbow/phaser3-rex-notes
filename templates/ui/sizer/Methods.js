import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import LayoutChildren from './LayoutChildren.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveHeight from './ResolveHeight.js';
import HasWidthWrap from './HasWidthWrap.js';
import RunWidthWrap from './RunWidthWrap.js';
import HasHeightWrap from './HasHeightWrap.js';
import RunHeightWrap from './RunHeightWrap.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import AlignMethods from './AlignMethods.js';
import ProportionMethods from './ProportionMethods.js';
import ExpandMethods from './ExpandMethods.js';
import SetChildrenAlignMode from './SetChildrenAlignMode.js';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods.js';

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
    hasWidthWrap: HasWidthWrap,
    runWidthWrap: RunWidthWrap,
    hasHeightWrap: HasHeightWrap,
    runHeightWrap: RunHeightWrap,

    setChildrenAlignMode: SetChildrenAlignMode,
};

Object.assign(
    methods,
    AddChildMethods,
    RemoveChildMethods,
    AlignMethods,
    ProportionMethods,
    ExpandMethods,
    SortChildrenMethods,
);

export default methods;