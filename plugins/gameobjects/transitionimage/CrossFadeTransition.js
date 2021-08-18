var OnStart = function (frontImage, backImage, t, parent) {
    frontImage.setAlpha(1);
    backImage.setVisible(true);
}

var OnProgress = function (frontImage, backImage, t, parent) {
    frontImage.setAlpha(1 - t);
    backImage.setAlpha(t);
}

var OnComplete = function (frontImage, backImage, t, parent) {
    frontImage.setAlpha(1);
    backImage.setVisible(false);
}

export {
    OnStart, OnProgress, OnComplete
}