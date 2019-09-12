const DistanceBetween = Phaser.Math.Distance.Between;
const AngleBetween = Phaser.Math.Angle.Between;

var UpdateTexture = function () {
    if (!this.redraw) {
        return this;
    }
    this.redraw = false;
    this.clear();

    var lineStartFrame = this.lineStartFrame;
    var lineEndFrame = this.lineEndFrame;
    var lineBodyFrame = this.lineBodyFrame;
    var lineStartOffset = 0;
    var width = DistanceBetween(this.x0, this.y0, this.x1, this.y1),
        height = 0,
        rotation = AngleBetween(this.x0, this.y0, this.x1, this.y1);
    if (lineStartFrame) {
        lineStartOffset = this.lineStartOrigin * lineStartFrame.cutWidth;
        width += lineStartOffset;
        height = lineStartFrame.cutHeight;
    }
    if (lineEndFrame) {
        width += ((1 - this.lineEndOrigin) * lineEndFrame.cutWidth);
        height = Math.max(height, lineEndFrame.cutHeight);
    }
    if (lineBodyFrame) {
        var lineBodyHeight = (this.lineBodyWidth !== undefined) ? this.lineBodyWidth : lineBodyFrame.cutHeight;
        height = Math.max(height, lineBodyHeight);
    }

    width = Math.floor(width);
    height = Math.floor(height);

    // no line
    if ((width <= 0) || (height <= 0)) {
        this
            .setPosition(this.x0, this.y0)
            .setSize(1, 1)
            .setRotation(rotation);
        return this;
    }

    this
        .setPosition(this.x0, this.y0)
        .setSize(width, height)
        .setRotation(rotation)
        .setOrigin(0, 0); // Set origin to (0,0) before pasting textures

    var offsetX, offsetY;
    var remainderWidth = this.width;
    // Draw line start
    if (lineStartFrame) {
        offsetX = 0;
        offsetY = (this.height - lineStartFrame.cutHeight) / 2;
        this.drawFrame(this.lineStartTexture, this.lineStartFrameName, offsetX, offsetY);
        remainderWidth -= lineStartFrame.cutWidth;
    }
    // Draw line end
    if (lineEndFrame) {
        offsetX = this.width - lineEndFrame.cutWidth;
        offsetY = (this.height - lineEndFrame.cutHeight) / 2;
        this.drawFrame(this.lineEndTexture, this.lineEndFrameName, offsetX, offsetY);
        remainderWidth -= lineEndFrame.cutWidth;
    }

    // Draw line body
    if (lineBodyFrame && (remainderWidth > 0) && (lineBodyHeight > 0)) {
        var lineBody;
        if (this.lineBodyExtendMode === 0) {
            if (this._image === undefined) {
                this._image = this.scene.make.image({
                    add: false,
                    origin: { x: 0, y: 0 },
                });
            }
            lineBody = this._image;
            lineBody
                .setTexture(this.lineBodyTexture, this.lineBodyFrameName)
                .setDisplaySize(remainderWidth, lineBodyHeight);
        } else {
            if (this._tileSprite === undefined) {
                this._tileSprite = this.scene.make.tileSprite({
                    add: false,
                    origin: { x: 0, y: 0 },
                });
            }
            lineBody = this._tileSprite;
            lineBody
                .setTexture(this.lineBodyTexture, this.lineBodyFrameName)
                .setSize(remainderWidth, lineBodyHeight);
        }
        offsetX = (lineStartFrame) ? lineStartFrame.cutWidth : 0;
        offsetY = (this.height - lineBody.displayHeight) / 2;
        this.draw(lineBody, offsetX, offsetY);
    }

    var originX = 1 - ((width - lineStartOffset) / width);
    this.setOrigin(originX, 0.5);
}

export default UpdateTexture;