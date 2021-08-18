var OnStart = function (currentImage, nextImage, t, parent) {
    nextImage.setVisible(true);
}

var OnProgress = function (currentImage, nextImage, t, parent) {
    currentImage.setAlpha(1 - t);
    nextImage.setAlpha(t);
}

var OnComplete = function (currentImage, nextImage, t, parent) {
    currentImage.setAlpha(1);
}

export {
    OnStart, OnProgress, OnComplete
}