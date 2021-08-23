var GetFuzzySets = function (fuzzyModule) {
    var fuzzySets = {};
    fuzzyModule.flvs.forEach(function (flv) {
        flv.fuzzySets.forEach(function (fuzzySet) {
            fuzzySets[fuzzySet.name] = fuzzySet;
        })
    })
    return fuzzySets;
}

export default GetFuzzySets;