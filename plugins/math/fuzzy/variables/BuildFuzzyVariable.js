import { FuzzyVariable } from '../../../utils/yuka/fuzzy/FuzzyVariable.js';
import BuildFuzzySet from './BuildFuzzySet';

var BuildFuzzyVariable = function (setsConfig) {
    var flv = new FuzzyVariable();
    for (var i = 0, cnt = setsConfig.length; i < cnt; i++) {
        var flvConfig = setsConfig[i]; // [setName, left, middle, right, type]
        var fuzzySet = BuildFuzzySet(
            flvConfig[1], flvConfig[2], flvConfig[3], flvConfig[4],
            (i === 0) ? 0 : ((i == cnt - 1) ? 2 : 3)
        );
        fuzzySet.name = flvConfig[0];
        flv.add(fuzzySet);
    }
    return flv;
}

export default BuildFuzzyVariable;