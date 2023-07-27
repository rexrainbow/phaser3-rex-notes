const MinVersion = 60;

var CheckP3Version = function (minVersion) {
    if (minVersion === undefined) {
        minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
        console.error(`Minimum supported version : ${minVersion}, current phaser3 version : ${currentVersion}`)
    }
}

export default CheckP3Version;