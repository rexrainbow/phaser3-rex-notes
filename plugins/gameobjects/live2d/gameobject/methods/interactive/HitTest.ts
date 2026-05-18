var HitTest = function(hitAreaName?: any, worldX?: any, worldY?: any, camera?: any) {
    var modelXY = this.getModelXY(worldX, worldY, camera, true);
    return this.model.hitTest(hitAreaName, modelXY);
}

export default HitTest;