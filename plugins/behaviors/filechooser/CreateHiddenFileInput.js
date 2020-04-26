var CreateHiddenFileInput = function () {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    var style = fileInput.style;
    style.width = '0px';
    style.height = '0px';
    return fileInput;
}

export default CreateHiddenFileInput;