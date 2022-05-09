import AwaitFile from '../awaitloader/AwaitFile.js';


const loaderCallback = function (key, uri) {
    this.addFile(CreateAwiatFile(this, key, uri));
    return this;
}

var CreateAwiatFile = function (loader, key, uri) {
    var callback = function (successCallback, failureCallback) {
        var imageElement = new Image();
        imageElement.onload = function () {
            var canvasTexture = loader.scene.sys.textures.createCanvas(key, imageElement.width, imageElement.height);
            canvasTexture.getContext().drawImage(imageElement, 0, 0);
            canvasTexture.refresh();
            successCallback();
        }
        imageElement.src = uri;
    }

    return new AwaitFile(loader, {
        type: 'imageuri',
        config: {
            key: key,
            callback: callback
        }
    });
}

export default loaderCallback;