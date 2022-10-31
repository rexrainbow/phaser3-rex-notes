import CreateBackground from './CreateBackground.js';
// Input
import CreateInputRow from './CreateInputRow.js';
import CreateInputField from './CreateInputField.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateRangeInput from './CreateRangeInput.js';
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
    inputField: CreateInputField,
    textInput: CreateTextInput,
    numberInput: CreateNumberInput,
    rangeInput:CreateRangeInput,
    
    // Folder
    folderBackground: CreateFolderBackground,
    folderTitle: CreateFolderTitle,

    // Uitls
    roundRectangle: CreateRoundRectangle
}

export default Builders;