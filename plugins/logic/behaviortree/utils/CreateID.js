import UUID from '../../../utils/string/UUID.js';

var sn = null;

var SetSerialNumber = function (value) {
    if (value === undefined) {
        value = null;
    }

    sn = value;
}

var GetSerialNumber = function () {
    return sn;
}

var CreateID = function () {
    if (sn === null) {
        return UUID();
    }

    sn += 1;
    return sn.toString();
}

export {
    CreateID,
    SetSerialNumber,
    GetSerialNumber,
};