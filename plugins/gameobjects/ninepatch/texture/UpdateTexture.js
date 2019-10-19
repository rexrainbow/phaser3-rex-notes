var UpdateTexture = function () {
    this.clear();

    if ((this.textureKey === undefined) || (!this.scene.textures.get(this.textureKey))) {
        return this;
    }

    var remainderWidth = this.width - this.columns.minWidth;
    var remainderHeight = this.height - this.rows.minHeight;
    var proportionWidth = (this.columns.stretch > 0) ? (remainderWidth / this.columns.stretch) : 0;
    var proportionHeight = (this.rows.stretch > 0) ? (remainderHeight / this.rows.stretch) : 0;

    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0, offsetY = 0;
    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
        row = this.rows.data[j];
        rowHeight = (row.stretch === 0) ? row.height : (proportionHeight * row.stretch);

        offsetX = 0;
        for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
            col = this.columns.data[i];
            colWidth = (col.stretch === 0) ? col.width : (proportionWidth * col.stretch);

            frameName = this.getFrameNameCallback(i, j);
            if (frameName) {
                if ((row.stretch === 0) && (col.stretch === 0)) { // Draw frame
                    this.drawFrame(this.textureKey, frameName, offsetX, offsetY);
                } else {
                    if ((colWidth > 0) && (rowHeight > 0)) {
                        var gameObject;
                        if (this.getStretchMode(i, j) === 0) { // Scaled image
                            // Draw scaled image
                            if (this._image === undefined) {
                                this._image = this.scene.make.image({
                                    add: false,
                                    origin: { x: 0, y: 0 },
                                });
                            }
                            gameObject = this._image;
                            gameObject
                                .setTexture(this.textureKey, frameName)
                                .setDisplaySize(colWidth, rowHeight);
                        } else { // Repeat tile-sprite
                            if (this._tileSprite === undefined) {
                                this._tileSprite = this.scene.make.tileSprite({
                                    add: false,
                                    origin: { x: 0, y: 0 },
                                });
                            }
                            gameObject = this._tileSprite;
                            gameObject
                                .setTexture(this.textureKey, frameName)
                                .setSize(colWidth, rowHeight);
                        }
                        this.draw(gameObject, offsetX, offsetY);
                    }
                }
            }
            offsetX += colWidth;
        }

        offsetY += rowHeight;
    }
}

export default UpdateTexture;