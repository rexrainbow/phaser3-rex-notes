const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFileInput = function (game, config) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    var style = fileInput.style;
    style.zIndex = '0';
    style.display = 'inline';
    style.position = 'absolute';
    style.opacity = '0'; // Make file input invisible

    var accept = GetValue(config, 'accept', '');
    var multiple = GetValue(config, 'multiple', false);

    fileInput.setAttribute('accept', accept);
    if (multiple) {
        fileInput.setAttribute('multiple', '');
    } else {
        fileInput.removeAttribute('multiple');
    }

    var parent = game.domContainer;
    if (parent) {
        parent.appendChild(fileInput);
    }

    return fileInput;
}

export default CreateFileInput;