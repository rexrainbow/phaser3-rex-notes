var HitAreaCallback = function (shape, localX, localY, gameObject) {
    var model = gameObject.model;
    if (!model) {
        return false;
    }

    var hitTestResult = model._hitTestResult;

    if ((localX) < 0 || (localX > model._modelWidth) ||
        (localY < 0) || (localY > model._modelHeight)) {
        // Set all hit test result to false
        for (var name in hitTestResult) {
            hitTestResult[name] = false;
        }
        return false;
    }

    var x = model.localXToModelMatrixX(localX);
    var y = model.localYToModelMatrixY(localY);
    var modelSetting = model._modelSetting;
    var count = modelSetting.getHitAreasCount();
    var anyHit = false;
    for (var i = 0; i < count; i++) {
        var hitTestName = modelSetting.getHitAreaName(i);
        var drawId = modelSetting.getHitAreaId(i);
        var isHit = model.isHit(drawId, x, y);
        hitTestResult[hitTestName] = isHit;
        anyHit = anyHit || isHit;
    }

    return anyHit;
}

export default HitAreaCallback;