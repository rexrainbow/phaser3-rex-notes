const MinVersion = 60;

var HasTested = false;

var CheckP3Version = function (minVersion) {
    if (HasTested) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
        console.error(`Minimum supported version : 3.${minVersion}`)
    }

    HasTested = true;
}

export default CheckP3Version;