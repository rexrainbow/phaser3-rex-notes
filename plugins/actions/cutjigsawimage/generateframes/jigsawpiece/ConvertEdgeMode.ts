var ConvertEdgeMode = function(edgeMode?: any) {
    if (typeof (edgeMode) === 'string') {
        edgeMode = edgeMode.split('').map(function(x?: any) { return parseInt(x) });
        edgeMode = {
            right: edgeMode[0],
            bottom: edgeMode[1],
            left: edgeMode[2],
            top: edgeMode[3]
        }
    }

    return edgeMode;
}

export default ConvertEdgeMode;