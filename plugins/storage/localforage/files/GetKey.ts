var GetHeaderKey = function(fileID?: any) {
    return `H-${fileID}`;
}

var GetContentKey = function(fileID?: any) {
    return `C-${fileID}`;
}

var IsHeaderKey = function(key?: any) {
    return key.charAt(0) === 'H';
}

var IsContentKey = function(key?: any) {
    return key.charAt(0) === 'C';
}

var GetFileID = function(key?: any) {
    return key.split('-')[1];
}

export {
    GetHeaderKey, GetContentKey,
    IsHeaderKey, IsContentKey,
    GetFileID
};