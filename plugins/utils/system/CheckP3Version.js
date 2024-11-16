const MainVersionNumber = 4;
const SubVersionNumber = 0;

var IsChecked = false;

var CheckP3Version = function (minVersion) {
    if (IsChecked) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = SubVersionNumber;
    }
    var version = Phaser.VERSION.split('.');
    var mainVersion = parseInt(version[0]);
    if (mainVersion === MainVersionNumber) {
        var subVersion = parseInt(version[1])
        if (subVersion < minVersion) {
            console.error(`Minimum supported version : ${mainVersion}.${subVersion}`)
        }
    } else {
        console.error(`Can't supported version : ${mainVersion}`)
    }

    IsChecked = true;
}

export default CheckP3Version;