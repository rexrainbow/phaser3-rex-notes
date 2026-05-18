import AwaitFile from '../awaitloader/AwaitFile';


const LoaderCallback = function(key?: any, uri?: any, frameConfig?: any) {
    this.addFile(CreateAwiatFile(this, key, uri, frameConfig));
    return this;
}

var CreateAwiatFile = function(loader?: any, key?: any, uri?: any, frameConfig?: any) {
    var callback = function(successCallback?: any, failureCallback?: any) {
        var imageElement = new Image();
        imageElement.onload = function() {
            if (frameConfig === undefined) {
                loader.textureManager.addImage(key, imageElement);
            } else {
                loader.textureManager.addSpriteSheet(key, imageElement, frameConfig);
            }
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

export default LoaderCallback;