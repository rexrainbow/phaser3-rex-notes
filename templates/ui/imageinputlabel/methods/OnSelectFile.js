var OnSelectFile = function (parent, files) {
    if (files.length === 0) {
        return;
    }

    var imageBox = parent.childrenMap.icon;
    var canvas = imageBox.image;
    var selectedFile = files[0];
    return canvas.loadFromFilePromise(selectedFile)
        .then(function () {
            imageBox.scaleImage();

            parent.emit('select', selectedFile, parent);
            return Promise.resolve(selectedFile);
        })
}

export default OnSelectFile;