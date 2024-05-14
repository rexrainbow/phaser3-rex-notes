import FitToSize from '../../../../utils/size/FitTo.js';

var FitImages = function () {
    var scaleMode = this.scaleMode - 1;  // 1->0(FIT), 2->1(ENVELOP)
    for (var i = 0, cnt = this.images.length; i < cnt; i++) {
        var image = this.images[i];
        var result = FitToSize(image, this, scaleMode, true);
        var biasScale = result.width / image.width;
        this.setChildLocalScale(image, biasScale);
        image.biasScale = biasScale;
    }
}

export default FitImages;