import ResizeGameObject from '../../../../utils/size/ResizeGameObject.js';

var ResizeBackground = function () {
    var background = this.background;
    if (!background) {
        return this;
    }

    background.setOrigin(this.originX, this.originY);
    background.setPosition(this.x, this.y);
    ResizeGameObject(background, this.displayWidth, this.displayHeight);
    this.resetChildScaleState(background);
    return this;
}

export default ResizeBackground;