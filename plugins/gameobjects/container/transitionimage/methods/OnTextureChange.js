import FitImages from './FitImages.js';

var OnTextureChange = function (newImage) {
    if (!this.fixedSizeMode) {
        this.resize(newImage.width, newImage.height);

    } else {
        // Fit all images to parent's size
        FitImages.call(this);
    }
}

export default OnTextureChange;