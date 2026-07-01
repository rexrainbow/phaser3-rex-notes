import { VERSION as PhaserVERSION } from 'phaser';

const MainVersionNumber = 4;
const SubVersionNumber = 2;

var IsChecked = false;

var CheckPhaserVersion = function (minVersion) {
    if (IsChecked) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = SubVersionNumber;
    }
    var version = PhaserVERSION.split('.');
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

export default CheckPhaserVersion;
