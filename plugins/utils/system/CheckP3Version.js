const MinVersion = 60;

var IsChecked = false;

var CheckP3Version = function (minVersion) {
    if (IsChecked) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = MinVersion;
    }
    var version = Phaser.VERSION.split('.');
    var mainVersion = parseInt(version[0]);
    if (mainVersion === 3) {
        var currentVersion = parseInt(version[1])
        if (currentVersion < minVersion) {
            console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`)
        }
    } else {
        console.error(`Can't supported version : ${mainVersion}`)
    }

    IsChecked = true;
}

export default CheckP3Version;