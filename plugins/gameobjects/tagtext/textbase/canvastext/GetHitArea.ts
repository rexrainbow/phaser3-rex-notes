import WorldXYToGameObjectLocalXY from '../../../../utils/position/WorldXYToGameObjectLocalXY';

var GetHitArea = function(worldX?: any, worldY?: any, camera?: any) {
    var localXY = WorldXYToGameObjectLocalXY(this.parent, worldX, worldY, camera, true);
    var area = this.hitAreaManager.getFirst(localXY.x, localXY.y);
    if (area === null) {
        return;
    }

    return area.data.key;
}

export default GetHitArea;