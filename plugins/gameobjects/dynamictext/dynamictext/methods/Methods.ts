import SetFixedSize from './SetFixedSize';
import SetPadding from './SetPadding';
import GetPadding from './GetPadding';
import ModifyTextStyle from './ModifyTextStyle';
import ModifyDefaultTextStyle from './ModifyDefaultTextStyle';
import ResetTextStyle from './ResetTextStyle';
import SetTestString from './SetTestString';

import RemoveChild from './RemoveChild';
import RemoveChildren from './RemoveChildren';
import PopChild from './PopChild';
import ClearContent from './ClearContent';
import AddChild from './AddChild';
import CreateCharChild from './CreateCharChild';
import CreateCharChildren from './CreateCharChildren';
import SetText from './SetText';
import AppendText from './AppendText';
import InsertText from './InsertText';
import RemoveText from './RemoveText';
import GetText from './GetText';
import CreateImageChild from './CreateImageChild';
import AppendImage from './AppendImage';
import CreateDrawerChild from './CreateDrawerChild';
import AppendDrawer from './AppendDrawer';
import CreateSpaceChild from './CreateSpaceChild';
import AppendSpace from './AppendSpace';
import CreateCommandChild from './CreateCommandChild';
import AppendCommand from './AppendCommand';
import SetWrapConfig from './SetWrapConfig';
import RunWordWrap from './RunWordWrap';
import RunVerticalWrap from './RunVerticalWrap';
import RunWrap from './RunWrap';
import SetAlignMethods from './SetAlignMethods';
import SetTextOXYMethods from './SetTextOXYMethods';
import RenderContent from './RenderContent';

import ForEachChild from './ForEachChild';
import ForEachRenderableChild from './ForEachRenderableChild';
import ForEachCharChild from './ForEachCharChild';
import GetChildren from './GetChildren';
import GetActiveChildren from './GetActiveChildren';
import GetCharChildren from './GetCharChildren';
import GetLastAppendedChildren from './GetLastAppendedChildren';
import GetNearestChild from './GetNearestChild';
import GetCharWorldPosition from './GetCharWorldPosition';
import SetToMinSize from './SetToMinSize';
import GetCharChildIndex from './GetCharChildIndex';
import GetCharChild from './GetCharChild';
import GetCharIndex from './GetCharIndex';

import SetChildrenInteractiveEnable from './input/SetChildrenInteractiveEnable';
import SetInteractive from './input/SetInteractive';

import MoveChildMethods from './MoveChildMethods';
import BackgroundMethods from './BackgroundMethods';
import InnerBoundsMethods from './InnerBoundsMethods';

var Methods = {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    modifyDefaultTextStyle: ModifyDefaultTextStyle,
    resetTextStyle: ResetTextStyle,
    setTestString: SetTestString,

    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    popChild: PopChild,
    clearContent: ClearContent,
    addChild: AddChild,
    createCharChild: CreateCharChild,
    createCharChildren: CreateCharChildren,
    setText: SetText,
    appendText: AppendText,
    insertText: InsertText,
    removeText: RemoveText,
    getText: GetText,
    createImageChild: CreateImageChild,
    appendImage: AppendImage,
    createDrawerChild: CreateDrawerChild,
    appendDrawer: AppendDrawer,
    createSpaceChild: CreateSpaceChild,
    appendSpace: AppendSpace,
    createCommandChild: CreateCommandChild,
    appendCommand: AppendCommand,

    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    runWrap: RunWrap,
    renderContent: RenderContent,

    forEachChild: ForEachChild,
    forEachRenderableChild: ForEachRenderableChild,
    forEachCharChild: ForEachCharChild,
    getChildren: GetChildren,
    getActiveChildren: GetActiveChildren,
    getCharChildren: GetCharChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getNearestChild: GetNearestChild,
    getCharWorldPosition: GetCharWorldPosition,

    setToMinSize: SetToMinSize,

    getCharChildIndex: GetCharChildIndex,
    getCharChild: GetCharChild,
    getCharIndex: GetCharIndex,


    setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
    setInteractive: SetInteractive,
}

Object.assign(
    Methods,

    MoveChildMethods,
    BackgroundMethods,
    InnerBoundsMethods,
    SetAlignMethods,
    SetTextOXYMethods,

)

export default Methods;