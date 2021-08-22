import { FuzzyVariable, } from 'yuka/build/yuka.module';
import BuildFuzzySet from './BuildFuzzySet';

var BuildFuzzyVariable = function (setsConfig) {
    var flv = new FuzzyVariable();
    for (var i = 0, cnt = setsConfig.length; i < cnt; i++) {
        var flvConfig = setsConfig[i]; // [postFix, left, middle, right, type]
        flv.add(BuildFuzzySet(
            (i === 0) ? 0 : ((i == cnt - 1) ? 2 : 3),
            flvConfig[4],
            flvConfig[1], flvConfig[2], flvConfig[3]
        ));
    }
    return flv;
}

export default BuildFuzzyVariable;