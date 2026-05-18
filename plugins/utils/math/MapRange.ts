var MapRange = function(value?: any, start1?: any, end1?: any, start2?: any, end2?: any) {
    var p = (value - start1) / (end1 - start1);
    return start2 + (p * (end2 - start2));
}

export default MapRange;