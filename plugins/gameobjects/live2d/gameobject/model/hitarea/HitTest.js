var HitTest = function (x, y, hitArenaName) {
    var count = this._modelSetting.getHitAreasCount();
    for (var i = 0; i < count; i++) {
        if (this._modelSetting.getHitAreaName(i) === hitArenaName) {
            var drawId = this._modelSetting.getHitAreaId(i);
            return this.isHit(drawId, x, y);
        }
    }

    return false;
}

export default HitTest;