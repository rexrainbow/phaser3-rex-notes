var DrawContent = function () {
    if (!this.fillPattern) {
        return;
    }

    var canvas = this.canvas,
        context = this.context;

    var positionX = this.tilePositionX,
        positionY = this.tilePositionY;
    var scaleX = this.tileScaleX,
        scaleY = this.tileScaleY;

    context.save();

    context.scale(scaleX, scaleY);
    context.translate(-positionX, -positionY);
    context.fillStyle = this.fillPattern;
    context.fillRect(positionX, positionY, this.width / scaleX, this.height / scaleY);

    context.restore();

}

export default DrawContent;