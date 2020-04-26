const GetValue = Phaser.Utils.Objects.GetValue;

var CreateHiddenFileInput = function (config) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    var style = fileInput.style;
    style.width = '0px';
    style.height = '0px';

    // config.accept
    fileInput.setAttribute('accept', GetValue(config, 'accept', ''));
    // config.multiple
    if (GetValue(config, 'multiple', false)) {
        fileInput.setAttribute('multiple', '');
    } else {
        fileInput.removeAttribute('multiple');
    }

    return fileInput;
}

export default CreateHiddenFileInput;