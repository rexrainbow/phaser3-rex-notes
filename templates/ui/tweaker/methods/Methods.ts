import RegisterInputHandler from './RegisterInputHandler';
import RemoveInputHandler from './RemoveInputHandler';
import AddFolder from './AddFolder';
import AddTab from './AddTab';
import AddColumns from './AddColumns';
import Add2Columns from './Add2Columns';
import AddWrap from './AddWrap';
import AddScrollable from './AddScrollable';
import AddArrayTable from './AddArrayTable';
import AddInput from './AddInput';
import AddButtons from './AddButtons';
import AddButton from './AddButton';
import AddSeparator from './AddSeparator';
import AddRows from './AddRows';
import SetBindingTarget from './SetBindingTarget';
import GetMaxInputRowTitleWidth from './GetMaxInputRowTitleWidth';
import SetInputRowTitleWidth from './SetInputRowTitleWidth';

var methods = {
    registerInputHandler: RegisterInputHandler,
    removeInputHandler: RemoveInputHandler,

    addFolder: AddFolder,
    addTab: AddTab,
    addColumns: AddColumns,
    add2Columns: Add2Columns,
    addWrap: AddWrap,
    addScrollable: AddScrollable,
    addArrayTable: AddArrayTable,
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