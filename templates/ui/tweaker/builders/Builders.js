import CreateBackground from './CreateBackground.js';
// Input
import CreateInputSizer from './CreateInputSizer.js';
import CreateInputTitle from './CreateInputTitle.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateTextInput from './CreateTextInput.js';
// Folder
import CreateFolderBackground from './CreateFolderBackground.js';
import CreateFolderTitle from './CreateFolderTitle.js';

// function (scene, config, styles, gameObject) { return gameObject; }

var Builders = {
    background: CreateBackground,

    // Input
    inputSizer: CreateInputSizer,
    inputTitle: CreateInputTitle,
    numberInput: CreateNumberInput,
    textInput: CreateTextInput,

    // Folder
    folderBackground: CreateFolderBackground,
    folderTitle: CreateFolderTitle,
}

export default Builders;