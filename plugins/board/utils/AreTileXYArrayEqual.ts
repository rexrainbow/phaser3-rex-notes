import AreTileXYEqual from './AreTileXYEqual';

var AreTileXYArrayEqual = function(tileArrayA?: any, tileArrayB?: any) {
    if (tileArrayA.length !== tileArrayB.length) {
        return false;
    } else {
        for (var i = 0, cnt = tileArrayA.length; i < cnt; i++) {
            if (!AreTileXYEqual(tileArrayA[i], tileArrayB[i])) {
                return false;
            }
        }
        return true;
    }
}
export default AreTileXYArrayEqual;