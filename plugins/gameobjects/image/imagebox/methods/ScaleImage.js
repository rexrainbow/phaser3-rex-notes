import FitToSize from '../../../../utils/size/FitTo.js';

var ScaleImage = function () {
    var image = this.image;

    if ((!this.scaleUp) &&
        (image.width <= this.width) && (image.height <= this.height)
    ) {
        return this;
    }

    var result = FitToSize(image, this, 'FIT', true);
    image.setDisplaySize(result.width, result.height);
    this.resetChildScaleState(image);
    return this;
}

export default ScaleImage;