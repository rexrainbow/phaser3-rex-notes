import GetSizerConfig from './GetSizerConfig';
import GetChildPrevState from '../utils/GetChildPrevState';
import PushIntoBounds from './PushIntoBounds';
import DrawBounds from './DrawBounds';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';
import AddChildrenMap from './AddChildrenMap';
import RemoveChildrenMap from './RemoveChildrenMap';
import GetElement from './GetElement';
import GetChildIndex from './GetChildIndex';
import PaddingMethods from './PaddingMethods';
import ResolveWidth from './ResolveWidth';
import HasWidthWrap from './HasWidthWrap';
import ResolveChildrenWidth from './ResolveChildrenWidth';
import RunWidthWrap from './RunWidthWrap';
import ResolveHeight from './ResolveHeight';
import HasHeightWrap from './HasHeightWrap';
import ResolveChildrenHeight from './ResolveChildrenHeight';
import RunHeightWrap from './RunHeightWrap';
import GetChildWidth from './GetChildWidth';
import GetChildHeight from './GetChildHeight';
import GetExpandedChildWidth from './GetExpandedChildWidth';
import GetExpandedChildHeight from './GetExpandedChildHeight';
import GetChildrenWidth from './GetChildrenWidth';
import GetChildrenHeight from './GetChildrenHeight';
import GetAllChildrenSizers from './GetAllChildrenSizers';
import GetChildrenSizers from './GetChildrenSizers';
import GetShownChildrenMethods from './GetShownChildrenMethods';
import PreLayout from './PreLayout';
import Layout from './Layout';
import RunLayout from './RunLayout';
import LayoutChildren from './LayoutChildren';
import PostLayout from './PostLayout';

import SetAnchor from './SetAnchor';
import ScaleMethods from './ScaleMethods';
import FadeMethods from './FadeMethods';
import EaseMoveMethods from './EaseMoveMethods';
import ShakeMethods from './ShakeMethods';
import EaseDataMethods from './EaseDataMethods';
import DelayCallMethods from './DelayCallMethods';
import HideMethods from './HideMethods';
import ModalMethods from './ModalMethods';
import BindEventMethods from './BindEventMethods';

import IsInTouching from './IsInTouching';
import PointToChild from './PointToChild';
import GetParentSizerMethods from './GetParentSizerMethods';
import LayoutBackgrounds from './LayoutBackgrounds';
import SetDraggable from './SetDraggable';
import ClickMethods from './ClickMethods';
import ClickOutsideMethods from './ClickOutsideMethods';
import TouchingMethods from './TouchingMethods';
import HoverMethods from './HoverMethods';
import SetChildrenInteractive from './SetChildrenInteractive';
import BroadcastEvent from './BroadcastEvent';

var methods = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth,
    hasWidthWrap: HasWidthWrap,
    resolveChildrenWidth: ResolveChildrenWidth,
    runWidthWrap: RunWidthWrap,
    resolveHeight: ResolveHeight,
    hasHeightWrap: HasHeightWrap,
    resolveChildrenHeight: ResolveChildrenHeight,
    runHeightWrap: RunHeightWrap,
    getChildWidth: GetChildWidth,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,

    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    removeChildrenMap: RemoveChildrenMap,
    getElement: GetElement,
    getChildIndex: GetChildIndex,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren,

    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,

    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild,
    setDraggable: SetDraggable,
    setChildrenInteractive: SetChildrenInteractive,
    broadcastEvent: BroadcastEvent,

};

Object.assign(
    methods,
    PaddingMethods,
    AddChildMethods,
    RemoveChildMethods,
    GetParentSizerMethods,
    ScaleMethods,
    FadeMethods,
    EaseMoveMethods,
    ShakeMethods,
    EaseDataMethods,
    DelayCallMethods,
    ClickMethods,
    ClickOutsideMethods,
    TouchingMethods,
    HoverMethods,
    HideMethods,
    ModalMethods,
    GetShownChildrenMethods,
    BindEventMethods,
);

export default methods;