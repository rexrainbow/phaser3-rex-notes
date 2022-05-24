import CreateAnyLabel from './utils/CreateAnyLabel.js';
import Label from '../../label/Label.js';

var CreateLabel = function (scene, data, styles, customBuilders) {
    return CreateAnyLabel(scene, data, styles, customBuilders, Label);
}

export default CreateLabel;