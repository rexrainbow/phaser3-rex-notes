import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetExpandedChildWidth from './GetExpandedChildWidth';
import GetExpandedChildHeight from './GetExpandedChildHeight';
import GetChildrenSizers from './GetChildrenSizers';
import PreLayout from './PreLayout';
import LayoutChildren from './LayoutChildren';
import ResolveWidth from './ResolveWidth';
import ResolveHeight from './ResolveHeight';
import HasWidthWrap from './HasWidthWrap';
import RunWidthWrap from './RunWidthWrap';
import HasHeightWrap from './HasHeightWrap';
import RunHeightWrap from './RunHeightWrap';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';
import AlignMethods from './AlignMethods';
import ProportionMethods from './ProportionMethods';
import ExpandMethods from './ExpandMethods';
import SetChildrenAlignMode from './SetChildrenAlignMode';
import SortChildrenMethods from '../basesizer/utils/SortChildrenMethods';

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