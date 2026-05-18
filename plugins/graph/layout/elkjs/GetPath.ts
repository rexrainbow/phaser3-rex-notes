var GetPath = function(edgeData?: any) {
    var result = [];

    var pathData = edgeData.sections[0];

    result.push(pathData.startPoint);

    if (pathData.bendPoints) {
        pathData.bendPoints.forEach(function(point?: any) {
            result.push(point);
        })
    }

    result.push(pathData.endPoint);

    return result;
}

export default GetPath;