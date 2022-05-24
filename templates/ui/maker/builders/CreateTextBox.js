import CreateAnyLabel from './utils/CreateAnyLabel.js';
import TextBox from '../../textbox/TextBox.js';

var CreateTextBox = function (scene, data, styles, customBuilders) {
    return CreateAnyLabel(scene, data, styles, customBuilders, TextBox);
}

export default CreateTextBox;