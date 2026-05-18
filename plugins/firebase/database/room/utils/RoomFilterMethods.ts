var GetRoomState = function(filterString?: any) {
    return filterString.split('|')[0];
}

var GetRoomType = function(filterString?: any) {
    return filterString.split('|')[1];
}

var GetFilterString = function(roomState?: any, roomType?: any) {
    if (roomType === undefined) {
        roomType = '';
    }
    return `${roomState}|${roomType}`;
}

export {
    GetRoomState,
    GetRoomType,
    GetFilterString
};