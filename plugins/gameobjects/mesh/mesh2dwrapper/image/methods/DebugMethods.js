import { GameObjects as PhaserGameObjects } from 'phaser';

const GetCalcMatrix = PhaserGameObjects.GetCalcMatrix;

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

        for (var i = 0; i < meshLength; i += 6) {
            var x0 = verts[i + 0];
            var y0 = verts[i + 1];
            var x1 = verts[i + 2];
            var y1 = verts[i + 3];
            var x2 = verts[i + 4];
            var y2 = verts[i + 5];

            graphic.lineBetween(x0, y0, x1, y1);
            graphic.lineBetween(x1, y1, x2, y2);
            graphic.lineBetween(x2, y2, x0, y0);
        }
    },

    runDebugCallback(drawingContext, parentMatrix) {
        var camera = drawingContext.camera;
        var calcMatrix = GetCalcMatrix(this, camera, parentMatrix, !drawingContext.useCanvas).calc;
        var faceIndices = this.faceIndices;
        var vertexObjects = this.vertexObjects;
        var displayOriginX = this.displayOriginX;
        var displayOriginY = this.displayOriginY;
        var verts = [];

        for (var i = 0, cnt = faceIndices.length; i < cnt; i++) {
            var vertex = vertexObjects[faceIndices[i]];
            var x = vertex.localX - displayOriginX;
            var y = vertex.localY - displayOriginY;

            verts.push(
                calcMatrix.getX(x, y),
                calcMatrix.getY(x, y)
            );
        }

        this.debugCallback.call(this, this, verts.length, verts);

        return this;
    },
}
