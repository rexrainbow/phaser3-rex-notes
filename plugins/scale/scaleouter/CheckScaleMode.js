var WarnCounter = 0;

var CheckScaleMode = function (scene) {
    var scaleManager = scene.scale;
    if (scaleManager.scaleMode !== Phaser.Scale.RESIZE) {
        if (WarnCounter === 0) {
            console.warn('Scale outer only works with RESIZE scale mode');
        }
        WarnCounter++;
        return false;
    }

    return true;
}

export default CheckScaleMode;