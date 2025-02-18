import WorldXYToGameObjectLocalXY from '../../../../../utils/position/WorldXYToGameObjectLocalXY.js';

export default {
    getFaceAt(worldX, worldY, camera) {
        var localXY = WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, true);
        var localX = localXY.x,
            localY = localXY.y;
        var faces = this.faces;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            var face = faces[i];
            if (face.contains(localX, localY)) {
                return face;
            }
        }

        return null;
    },

    hasFaceAt(worldX, worldY, camera) {
        return !!this.getFaceAt(worldX, worldY, camera);
    },
}