import WorldXYToGameObjectLocalXY from '../../../../utils/position/WorldXYToGameObjectLocalXY.js';

var GetHitArea = function (worldX, worldY, camera) {
    var localXY = WorldXYToGameObjectLocalXY(this.parent, worldX, worldY, camera, true);
    var area = this.hitAreaManager.getFirst(localXY.x, localXY.y);
    if (area === null) {
        return;
    }

    return area.data.key;
}

export default GetHitArea;