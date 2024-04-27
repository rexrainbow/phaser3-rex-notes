import FitToSize from '../../../../utils/size/FitTo.js';

var ScaleImage = function() {
    var image = this.image;

    var result = FitToSize(image, this, this.scaleUp, true);
    image.setDisplaySize(result.width, result.height);
    this.resetChildScaleState(image);
    return this;
}

export default ScaleImage;