var OnStart = function (parent, currentImage, nextImage, t) {
}

var OnProgress = function (parent, currentImage, nextImage, t) {
    parent
        .setChildAlpha(currentImage, 1 - t)
        .setChildAlpha(nextImage, t)
}

var OnComplete = function (parent, currentImage, nextImage, t) {
    parent.setChildAlpha(currentImage, 1)
}

export {
    OnStart, OnProgress, OnComplete
}