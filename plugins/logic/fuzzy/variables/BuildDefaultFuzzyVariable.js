import { FuzzyVariable, } from 'yuka/build/yuka.module';
import BuildFuzzySet from './BuildFuzzySet';

var BuildDefaultFuzzyVariable = function () {
    var flv = new FuzzyVariable();
    flv.add(BuildFuzzySet(
        0, '-',
        0, 0.25, 0.5
    ));
    flv.add(BuildFuzzySet(
        1, '',
        0.25, 0.5, 0.75
    ));
    flv.add(BuildFuzzySet(
        2, '+',
        0.5, 0.75, 1
    ));
    return flv;
}

export default BuildDefaultFuzzyVariable;