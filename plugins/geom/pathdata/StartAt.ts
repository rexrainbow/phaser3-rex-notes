var StartAt = function(x?: any, y?: any, pathData?: any) {
    pathData.length = 0;

    if (x != null) {
        pathData.push(x, y);
    }

    return pathData;
}

export default StartAt;