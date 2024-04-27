import FitToSize from '../../../../utils/size/FitTo.js';

var FitImages = function () {
    for (var i = 0, cnt = this.images.length; i < cnt; i++) {
        var image = this.images[i];
        var result = FitToSize(image, this, true, true);
        var biasScale = result.width / image.width;
        this.setChildLocalScale(image, biasScale);
        image.biasScale = biasScale;
    }
}

export default FitImages;