var AreTileXYEqual = function(tileA?: any, tileB?: any) {
    return tileA && tileB && (tileA.x === tileB.x) && (tileA.y === tileB.y);
}
export default AreTileXYEqual;