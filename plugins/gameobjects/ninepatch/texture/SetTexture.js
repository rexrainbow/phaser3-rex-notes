var SetTexture = function (key, columns, rows) {
    this.textureKey = key;
    this.columns.data = columns;
    this.columns.count = (columns) ? columns.length : 0;
    this.columns.stretch = 0;
    this.columns.minWidth = 0;
    this.rows.data = rows;
    this.rows.count = (rows) ? rows.length : 0;
    this.rows.stretch = 0;
    this.rows.minHeight = 0;

    var texture = this.scene.textures.get(key);
    if (!texture) {
        this.clear();
        return this;
    }
    if (!columns || !rows) {
        this.clear();
        return this;
    }

    var row, col, rowHeight, colWidth, frameName;
    var offsetX = 0, offsetY = 0;
    for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
        if (typeof (rows[j]) === 'number') {
            rows[j] = {
                height: rows[j],
                stretch: (j % 2),
            }
        }

        row = rows[j];
        rowHeight = row.height;

        this.rows.stretch += (row.stretch | 0);
        this.rows.minHeight += (row.stretch > 0) ? 0 : rowHeight;

        offsetX = 0;
        for (var i = 0, icnt = columns.length; i < icnt; i++) {
            if (typeof (columns[i]) === 'number') {
                columns[i] = {
                    width: columns[i],
                    stretch: (i % 2),
                }
            }

            col = columns[i];
            colWidth = col.width;

            if (j === 0) {
                this.columns.stretch += (col.stretch | 0);
                this.columns.minWidth += (col.stretch > 0) ? 0 : colWidth;
            }

            if ((colWidth >= 1) && (rowHeight >= 1)) {
                frameName = this.getFrameNameCallback(i, j);
                if (frameName) {
                    texture.add(
                        this.getFrameNameCallback(i, j), 0,
                        offsetX, offsetY,
                        colWidth, rowHeight
                    );
                    // Do nothing if frameName is existed
                }
            }
            offsetX += colWidth;
        }
        offsetY += rowHeight;
    }

    this.updateTexture();
    return this;
}

export default SetTexture;