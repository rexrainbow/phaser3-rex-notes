var OnStart = function (parent, currentImage, nextImage, t) {
}

var OnProgress = function (parent, currentImage, nextImage, t) {
    currentImage.setAlpha(1 - t);
    nextImage.setAlpha(t);
}

var OnComplete = function (parent, currentImage, nextImage, t) {
    currentImage.setAlpha(1);
}

export {
    OnStart, OnProgress, OnComplete
}