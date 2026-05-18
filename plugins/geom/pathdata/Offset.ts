var Offset = function(x?: any, y?: any, pathData?: any) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        pathData[i] += x;
        pathData[i + 1] += y;
    }
    return pathData;
}

export default Offset;