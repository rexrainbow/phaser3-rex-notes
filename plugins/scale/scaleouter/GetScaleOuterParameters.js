var GetScaleOutParameters = function (scene, out) {
    if (out === undefined) {
        out = {};
    }

    var gameConfig = scene.game.config;
    var gameWindowCenterX = gameConfig.width / 2,
        gameWindowCenterY = gameConfig.height / 2;

    var displaySize = scene.scale.displaySize;
    var displayCentetX = displaySize.width / 2,
        displayCentetY = displaySize.height / 2;

    out.scrollX = gameWindowCenterX - displayCentetX;
    out.scrollY = gameWindowCenterY - displayCentetY;
    out.zoom = (gameWindowCenterX > gameWindowCenterY) ?
        (displayCentetX / gameWindowCenterX) :
        (displayCentetY / gameWindowCenterY);

    return out;
}

export default GetScaleOutParameters;