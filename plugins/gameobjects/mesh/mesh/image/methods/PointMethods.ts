import WorldXYToGameObjectLocalXY from '../../../../../utils/position/WorldXYToGameObjectLocalXY';

export default {
    getFaceAt(worldX?: any, worldY?: any, camera?: any) {
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

    hasFaceAt(worldX?: any, worldY?: any, camera?: any) {
        return !!this.getFaceAt(worldX, worldY, camera);
    },
}