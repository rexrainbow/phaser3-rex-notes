import RegisterInputHandler from './RegisterInputHandler.js';
import RemoveInputHandler from './RemoveInputHandler.js';
import AddFolder from './AddFolder.js';
import AddTab from './AddTab.js';
import AddColumns from './AddColumns.js';
import AddWrap from './AddWrap.js';
import AddScrollable from './AddScrollable.js';
import AddInput from './AddInput.js';
import AddButtons from './AddButtons.js';
import AddButton from './AddButton.js';
import AddSeparator from './AddSeparator.js';
import AddRows from './AddRows.js';
import SetBindingTarget from './SetBindingTarget.js';
import GetMaxInputRowTitleWidth from './GetMaxInputRowTitleWidth.js';
import SetInputRowTitleWidth from './SetInputRowTitleWidth.js';

var methods = {
    registerInputHandler: RegisterInputHandler,
    removeInputHandler: RemoveInputHandler,

    addFolder: AddFolder,
    addTab: AddTab,
    addColumns: AddColumns,
    addWrap: AddWrap,
    addScrollable: AddScrollable,
    addInput: AddInput,
    addButtons: AddButtons,
    addButton: AddButton,
    addSeparator: AddSeparator,
    addRows: AddRows,

    setBindingTarget: SetBindingTarget,

    getMaxInputRowTitleWidth: GetMaxInputRowTitleWidth,
    setInputRowTitleWidth: SetInputRowTitleWidth,
}

export default methods;