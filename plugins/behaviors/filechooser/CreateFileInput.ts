import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateFileInput = function(game?: any, config?: any) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    var accept = GetValue(config, 'accept', '');
    var multiple = GetValue(config, 'multiple', false);

    fileInput.setAttribute('accept', accept);
    if (multiple?: any) {
        fileInput.setAttribute('multiple', '');
    } else {
        fileInput.removeAttribute('multiple');
    }

    return fileInput;
}

export default CreateFileInput;