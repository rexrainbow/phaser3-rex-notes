const MinVersion = 60;

var IsChecked = false;

var CheckP3Version = function (minVersion) {
    if (IsChecked) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
        console.error(`Minimum supported version : 3.${minVersion}`)
    }

    IsChecked = true;
}

export default CheckP3Version;