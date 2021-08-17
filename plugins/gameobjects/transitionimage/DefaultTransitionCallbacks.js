var OnStart = function (frontImage, backImage) {
    backImage.setVisible(true);
}

var OnProgress = function (frontImage, backImage, t) {
    frontImage.setAlpha(1 - t);
    backImage.setAlpha(t);
}

var OnComplete = function (frontImage, backImage) {
    frontImage.setAlpha(1);
}

export {
    OnStart, OnProgress, OnComplete
}