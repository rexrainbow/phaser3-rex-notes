var HitAreaCallback = function (shape, localX, localY, gameObject) {
    var model = gameObject.model;
    if (!model) {
        return false;
    }

    var x = (localX / model._modelWidth) - 0.5;
    var y = (0.5 - (localY / model._modelHeight)) * 2;
    var modelSetting = model._modelSetting;
    var hitTestResult = model._hitTestResult;
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