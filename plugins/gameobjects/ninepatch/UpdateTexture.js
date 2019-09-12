import GetFrameName from './GetFrameName.js';

var UpdateTexture = function () {
    if (!this.redraw) {
        return this;
    }
    this.redraw = false;
    this.clear();

    var remainderWidth = this.width - this.columns.minWidth;
    var remainderHeight = this.height - this.rows.minHeight;
    var proportionWidth = (this.columns.extend > 0) ? (remainderWidth / this.columns.extend) : 0;
    var proportionHeight = (this.rows.extend > 0) ? (remainderHeight / this.rows.extend) : 0;

    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0, offsetY = 0;
    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
        row = this.rows.data[j];
        rowHeight = (row.extend === 0) ? row.height : (proportionHeight * row.extend);

        offsetX = 0;
        for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
            col = this.columns.data[i];
            colWidth = (col.extend === 0) ? col.width : (proportionWidth * col.extend);

            frameName = GetFrameName(i, j);
            if ((row.extend === 0) && (col.extend === 0)) { // Draw frame
                this.drawFrame(this.textureKey, frameName, offsetX, offsetY);
            } else {
                // Draw scaled image
                if (this._image === undefined) {
                    this._image = this.scene.make.image({
                        add: false,
                        origin: { x: 0, y: 0 },
                    });
                }
                this._image
                    .setTexture(this.textureKey, frameName)
                    .setDisplaySize(colWidth, rowHeight);
                this.draw(this._image, offsetX, offsetY);
            }

            offsetX += colWidth;
        }

        offsetY += rowHeight;
    }
}

export default UpdateTexture;