var HitAreaCallback = function (shape, localX, localY, gameObject) {
    var model = gameObject.model;
    if (!model) {
        return false;
    }

    var hitTestResult = model._hitTestResult;

    if ((localX < 0) || (localX > model._modelWidth) ||
        (localY < 0) || (localY > model._modelHeight)) {
        // Set all hit test result to false
        for (var name in hitTestResult) {
            hitTestResult[name] = false;
        }
        return false;
    }

    var matrixXY = model.localXYToMatrixXY(localX, localY, true);
    var x = matrixXY.x
    var y = matrixXY.y;
    var modelSetting = model._modelSetting;
    var count = modelSetting.getHitAreasCount();
    var anyHit = false;
    for (var i = 0; i < count; i++) {
        var hitAreaName = modelSetting.getHitAreaName(i);
        var isHit = model.hitTest(hitAreaName, x, y);
        hitTestResult[hitAreaName] = isHit;
        anyHit = anyHit || isHit;
    }

    return anyHit;
}

export default HitAreaCallback;