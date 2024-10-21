var GetPath = function (edgeData) {
    var result = [];

    var pathData = edgeData.sections[0];

    result.push(pathData.startPoint);

    if (pathData.bendPoints) {
        pathData.bendPoints.forEach(function (point) {
            result.push(point);
        })
    }

    result.push(pathData.endPoint);

    return result;
}

export default GetPath;