var OnStart = function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
}

var OnProgress = function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
    parent
        .setChildLocalAlpha(currentImage, 1 - t)
        .setChildLocalAlpha(nextImage, t)
}

var OnComplete = function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
    parent.setChildLocalAlpha(currentImage, 1)
}

export {
    OnStart, OnProgress, OnComplete
}