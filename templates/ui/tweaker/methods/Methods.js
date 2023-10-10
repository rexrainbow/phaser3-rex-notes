import RegisterInputHandler from './RegisterInputHandler.js';
import RemoveInputHandler from './RemoveInputHandler.js';
import AddFolder from './AddFolder.js';
import AddTab from './AddTab.js';
import AddInput from './AddInput.js';
import AddButtons from './AddButtons.js';
import AddButton from './AddButton.js';
import AddSeparator from './AddSeparator.js';
import SetBindingTarget from './SetBindingTarget.js';
import GetMaxInputRowTitleWidth from './GetMaxInputRowTitleWidth.js';
import SetInputRowTitleWidth from './SetInputRowTitleWidth.js';

var methods = {
    registerInputHandler: RegisterInputHandler,
    removeInputHandler: RemoveInputHandler,

    addFolder: AddFolder,
    addTab: AddTab,
    addInput: AddInput,
    addButtons: AddButtons,
    addButton: AddButton,
    addSeparator: AddSeparator,

    setBindingTarget: SetBindingTarget,

    getMaxInputRowTitleWidth: GetMaxInputRowTitleWidth,
    setInputRowTitleWidth: SetInputRowTitleWidth,
}

export default methods;