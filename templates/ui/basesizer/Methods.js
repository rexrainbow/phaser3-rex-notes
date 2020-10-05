import GetSizerConfig from '../utils/GetSizerConfig.js';
import PushIntoBounds from './PushIntoBounds.js';
import DrawBounds from './DrawBounds.js';
import AddChildMethods from './AddChildMethods.js';
import AddChildrenMap from './AddChildrenMap.js';
import GetElement from './GetElement.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetAllChildrenSizers from './GetAllChildrenSizers.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import PreLayout from './PreLayout.js';
import Layout from './Layout.js';
import _layout from './_Layout.js';
import PostLayout from './PostLayout.js';
import _layoutInit from './_layoutInit.js';

import SetAnchor from './SetAnchor.js';
import ScaleMethods from './ScaleMethods.js';
import FadeMethods from './FadeMethods.js';
import EaseMoveMethods from './EaseMoveMethods.js';
import IsInTouching from './IsInTouching.js';
import PointToChild from './PointToChild.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';
import LayoutBackgrounds from './LayoutBackgrounds.js';
import SetDraggable from './SetDraggable.js';

var methods = {
    getSizerConfig: GetSizerConfig,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    _layoutInit: _layoutInit,
    layout: Layout,
    _layout: _layout, // Override this method
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,

    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild,
    setDraggable: SetDraggable
};

Object.assign(
    methods,
    AddChildMethods,
    GetParentSizerMethods,
    ScaleMethods,
    FadeMethods,
    EaseMoveMethods
);

export default methods;