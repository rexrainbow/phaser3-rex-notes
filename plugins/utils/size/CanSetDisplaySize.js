var CanSetDisplaySize = function (gameObject) {
    if (gameObject.displayWidth === undefined) {
        return false;
    }

    for (var i = 0, cnt = ExcludeClassList.length; i < cnt; i++) {
        var excludeClass = ExcludeClassList[i];
        if (excludeClass && gameObject instanceof excludeClass) {
            return false;
        }
    }

    return true;
}

var ExcludeClassList = [
    Phaser.GameObjects.BitmapText,
];

export default CanSetDisplaySize;