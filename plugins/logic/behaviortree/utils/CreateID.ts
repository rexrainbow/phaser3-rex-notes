import UUID from '../../../utils/string/UUID';

var sn = null;
var snPrefix = '#';

var SetSerialNumber = function(value?: any) {
    if (value === undefined) {
        value = null;
    }

    sn = value;
}

var SetSerialNumberPrefix = function(prefix?: any) {
    snPrefix = prefix;
}

var GetSerialNumber = function() {
    return sn;
}

var CreateID = function() {
    if (sn === null) {
        return UUID();
    }

    sn += 1;
    return `${snPrefix}${sn}`;
}

export {
    CreateID,
    SetSerialNumber,
    SetSerialNumberPrefix,
    GetSerialNumber,
};