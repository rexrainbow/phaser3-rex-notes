var GenerateKernels = function (blur, quality, out) {
    if (out === undefined) {
        out = [];
    } else {
        out.length = 0;
    }
    for (var i = quality; i > 0; i--) {
        out.push(blur * (i / quality));
    }
    return out;
}

export default GenerateKernels;