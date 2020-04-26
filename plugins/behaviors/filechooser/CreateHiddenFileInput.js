const GetValue = Phaser.Utils.Objects.GetValue;

var CreateHiddenFileInput = function (config) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    var style = fileInput.style;
    style.width = '0px';
    style.height = '0px';

    var accept = GetValue(config, 'accept', '');
    var multiple = GetValue(config, 'multiple', false);

    fileInput.setAttribute('accept', accept);
    if (multiple) {
        fileInput.setAttribute('multiple', '');
    } else {
        fileInput.removeAttribute('multiple');
    }

    return fileInput;
}

export default CreateHiddenFileInput;