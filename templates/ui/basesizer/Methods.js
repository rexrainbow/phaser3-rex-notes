import GetSizerConfig from '../utils/GetSizerConfig.js';
import PushIntoBounds from './PushIntoBounds.js';
import DrawBounds from './DrawBounds.js';
import AddChildMethods from './AddChildMethods.js';
import AddChildrenMap from './AddChildrenMap.js';
import GetElement from './GetElement.js';
import PaddingMethods from './PaddingMethods.js';
import ResolveWidth from './ResolveWidth.js';
import ResolveChildrenWidth from './ResolveChildrenWidth.js';
import ResolveHeight from './ResolveHeight.js';
import GetChildWidth from './GetChildWidth.js';
import GetChildHeight from './GetChildHeight.js';
import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetAllChildrenSizers from './GetAllChildrenSizers.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import Layout from './Layout.js';
import RunLayout from './RunLayout.js';
import LayoutChildren from './LayoutChildren.js';
import PostLayout from './PostLayout.js';
import RunWidthWrap from './RunWidthWrap.js';

import SetAnchor from './SetAnchor.js';
import ScaleMethods from './ScaleMethods.js';
import FadeMethods from './FadeMethods.js';
import EaseMoveMethods from './EaseMoveMethods.js';
import HideMethods from './HideMethods.js';
import IsInTouching from './IsInTouching.js';
import PointToChild from './PointToChild.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';
import LayoutBackgrounds from './LayoutBackgrounds.js';
import SetDraggable from './SetDraggable.js';

var methods = {
    getSizerConfig: GetSizerConfig,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth,
    resolveChildrenWidth: ResolveChildrenWidth,
    resolveHeight: ResolveHeight,
    getChildWidth: GetChildWidth,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,

    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren,
    runWidthWrap: RunWidthWrap,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,

    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild,
    setDraggable: SetDraggable
};

Object.assign(
    methods,
    PaddingMethods,
    AddChildMethods,
    GetParentSizerMethods,
    ScaleMethods,
    FadeMethods,
    EaseMoveMethods,
    HideMethods
);

export default methods;