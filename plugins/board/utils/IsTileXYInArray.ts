import AreTileXYEqual from './AreTileXYEqual';

var IsTileXYInArray = function(tile?: any, arr?: any) {
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        if (AreTileXYEqual(tile, arr[i])) {
            return true;
        }
    }
    return false;
}

export default IsTileXYInArray;