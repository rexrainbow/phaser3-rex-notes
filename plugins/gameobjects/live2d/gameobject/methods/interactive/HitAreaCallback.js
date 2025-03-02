var HitAreaCallback = function (shape, localX, localY, gameObject) {
    var model = gameObject.model;
    if (!model) {
        return false;
    }

    var matrixXY = model.localXYToModelMatrixXY(localX, localY, true);
    var x = matrixXY.x
    var y = matrixXY.y;
    var modelSetting = model._modelSetting;
    var count = modelSetting.getHitAreasCount();
    var anyHit = false;

    var prevHitTestResult = model._prevHitTestResult;
    var hitTestResult = model._hitTestResult;
    for (var i = 0; i < count; i++) {
        var hitAreaName = modelSetting.getHitAreaName(i);
        var isHit = model.hitTest(hitAreaName, x, y);
        anyHit = anyHit || isHit;

        prevHitTestResult[hitAreaName] = hitTestResult[hitAreaName];
        hitTestResult[hitAreaName] = isHit;
    }

    return anyHit;
}

export default HitAreaCallback;