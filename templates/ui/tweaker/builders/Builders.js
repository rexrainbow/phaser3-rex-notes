import CreateBackground from './CreateBackground.js';
// Input
import CreateInputSizer from './CreateInputSizer.js';
import CreateInputTitle from './CreateInputTitle.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateInputField from './CreateInputField.js';
// Folder
import CreateFolderBackground from './CreateFolderBackground.js';
import CreateFolderTitle from './CreateFolderTitle.js';

// function (scene, config, styles, gameObject) { return gameObject; }

var Builders = {
    background: CreateBackground,

    // Input
    inputSizer: CreateInputSizer,
    inputTitle: CreateInputTitle,
    textInput: CreateTextInput,
    numberInput: CreateNumberInput,
    inputField: CreateInputField,

    // Folder
    folderBackground: CreateFolderBackground,
    folderTitle: CreateFolderTitle,
}

export default Builders;