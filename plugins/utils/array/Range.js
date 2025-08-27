var Range = function (start, end, step) {
    if (step === undefined) {
        step = (end >= start) ? 1 : -1;
    }
    var arr = [];
    if (step > 0) {
        for (var i = start; i < end; i += step) {
            arr.push(i);
        }
    } else if (step < 0) {
        for (var i = start; i > end; i += step) {
            arr.push(i);
        }
    }
    return arr;
}

export default Range;
