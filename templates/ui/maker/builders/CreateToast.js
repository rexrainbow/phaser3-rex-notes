import CreateAnyLabel from './utils/CreateAnyLabel.js';
import Toast from '../../toast/Toast.js';

var CreateToast = function (scene, data, styles, customBuilders) {
    return CreateAnyLabel(scene, data, styles, customBuilders, Toast);
}

export default CreateToast;