import CreateBackground from './CreateBackground.js';
// Input
import CreateInputRow from './CreateInputRow.js';
import CreateInputTitle from './CreateInputTitle.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateInputField from './CreateInputField.js';
// Folder
import CreateFolderBackground from './CreateFolderBackground.js';
import CreateFolderTitle from './CreateFolderTitle.js';
// Utils
import CreateRoundRectangle from './utils/CreateRoundRectangle.js';

// function (scene, config, style, gameObject) { return gameObject; }

var Builders = {
    background: CreateBackground,

    // Input
    inputRow: CreateInputRow,
    inputTitle: CreateInputTitle,
    textInput: CreateTextInput,
    numberInput: CreateNumberInput,
    inputField: CreateInputField,

    // Folder
    folderBackground: CreateFolderBackground,
    folderTitle: CreateFolderTitle,

    // Uitls
    roundRectangle: CreateRoundRectangle
}

export default Builders;