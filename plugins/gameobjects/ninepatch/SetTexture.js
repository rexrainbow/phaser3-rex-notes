import GetFrameName from './GetFrameName.js';

var SetTexture = function (key, columns, rows) {
    this.textureKey = key;
    this.columns.data = columns;
    this.columns.count = (columns) ? columns.length : 0;
    this.columns.extend = 0;
    this.columns.minWidth = 0;
    this.rows.data = rows;
    this.rows.count = (rows) ? rows.length : 0;
    this.rows.extend = 0;
    this.rows.minHeight = 0;

    var texture = this.scene.textures.get(key);
    if (!texture) {
        this.redraw = true;
        return this;
    }
    if (!columns || !rows) {
        this.redraw = true;
        return this;
    }

    var row, col, rowHeight, colWidth;
    var offsetX = 0, offsetY = 0;
    for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
        if (typeof (rows[j]) === 'number') {
            rows[j] = {
                height: rows[j],
                extend: (j % 2),
            }
        }

        row = rows[j];
        rowHeight = row.height;

        this.rows.extend += (row.extend | 0);
        this.rows.minHeight += (row.extend > 0) ? 0 : rowHeight;

        offsetX = 0;
        for (var i = 0, icnt = columns.length; i < icnt; i++) {
            if (typeof (columns[i]) === 'number') {
                columns[i] = {
                    width: columns[i],
                    extend: (i % 2),
                }
            }

            col = columns[i];
            colWidth = col.width;

            if (j === 0) {
                this.columns.extend += (col.extend | 0);
                this.columns.minWidth += (col.extend > 0) ? 0 : colWidth;
            }

            if ((colWidth >= 1) && (rowHeight >= 1)) {
                texture.add(GetFrameName(i, j), 0, offsetX, offsetY, colWidth, rowHeight); // Do nothing if frameName is existed
            }
            offsetX += colWidth;
        }
        offsetY += rowHeight;
    }

    this.redraw = true;
    return this;
}

export default SetTexture;