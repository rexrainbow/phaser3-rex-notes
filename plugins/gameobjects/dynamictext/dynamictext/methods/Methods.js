import SetFixedSize from './SetFixedSize.js';
import SetPadding from './SetPadding.js';
import GetPadding from './GetPadding.js';
import ModifyTextStyle from './ModifyTextStyle.js';
import ResetTextStyle from './ResetTextStyle.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import ClearContent from './ClearContent.js';
import AddChild from './AddChild.js';
import SetText from './SetText.js';
import AppendText from './AppendText.js';
import AppendImage from './AppendImage.js';
import AppendCommand from './AppendCommand.js';
import SetWrapConfig from './SetWrapConfig.js';
import RunWordWrap from './RunWordWrap.js';
import RunVerticalWrap from './RunVerticalWrap.js';
import DrawContent from './DrawContent.js';
import GetChildren from './GetChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js';
import GetActiveChildren from './GetActiveChildren.js';
import SetToMinSize from './SetToMinSize.js';


export default {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    resetTextStyle: ResetTextStyle,

    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clearContent: ClearContent,
    addChild: AddChild,
    setText: SetText,
    appendText: AppendText,
    appendImage: AppendImage,
    appendCommand: AppendCommand,

    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    drawContent: DrawContent,

    getChildren: GetChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getActiveChildren: GetActiveChildren,

    setToMinSize: SetToMinSize,
}