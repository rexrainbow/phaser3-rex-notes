export default {
    setDebug(graphic, callback) {
        this.debugGraphic = graphic;

        if (!graphic && !callback) {
            this.debugCallback = null;
        }
        else if (!callback) {
            this.debugCallback = this.renderDebugVerts;
        }
        else {
            this.debugCallback = callback;
        }

        return this;
    },

    renderDebugVerts(src, meshLength, verts) {
        var graphic = src.debugGraphic;

        var px0 = verts[0];
        var py0 = verts[1];
        var px1 = verts[2];
        var py1 = verts[3];

        graphic.lineBetween(px0, py0, px1, py1);

        for (var i = 4; i < meshLength; i += 4) {
            var x0 = verts[i + 0];
            var y0 = verts[i + 1];
            var x1 = verts[i + 2];
            var y1 = verts[i + 3];

            graphic.lineBetween(px0, py0, x0, y0);
            graphic.lineBetween(px1, py1, x1, y1);
            graphic.lineBetween(px1, py1, x0, y0);
            graphic.lineBetween(x0, y0, x1, y1);

            px0 = x0;
            py0 = y0;
            px1 = x1;
            py1 = y1;
        }
    },
}