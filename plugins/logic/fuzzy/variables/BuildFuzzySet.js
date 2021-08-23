import {
    LeftShoulderFuzzySet, LeftSCurveFuzzySet,
    RightShoulderFuzzySet, RightSCurveFuzzySet,
    TriangularFuzzySet, SingletonFuzzySet, NormalDistFuzzySet,
} from 'yuka/build/yuka.module';

const LeftPartFuzzySets = {
    shoulder: LeftShoulderFuzzySet,
    sCurve: LeftSCurveFuzzySet,
}
const RightPartFuzzySets = {
    shoulder: RightShoulderFuzzySet,
    sCurve: RightSCurveFuzzySet,
}
const MiddlePartFuzzySets = {
    triangular: TriangularFuzzySet,
    singleton: SingletonFuzzySet,
    normal: NormalDistFuzzySet
}

var BuildFuzzySet = function (partType, setType, left, middle, right) {
    var fuzzySetClass;
    if (partType === 0) {  // Left part
        if (setType === undefined) {
            setType = 'shoulder';
        }
        fuzzySetClass = LeftPartFuzzySets[setType];
    } else if (partType === 2) {  // Right part
        if (setType === undefined) {
            setType = 'shoulder';
        }
        fuzzySetClass = RightPartFuzzySets[setType];
    } else { // Others
        if (setType === undefined) {
            setType = 'triangular';
        }
        fuzzySetClass = MiddlePartFuzzySets[setType];
    }
    var fuzzySet = new fuzzySetClass(left, middle, right);
    return fuzzySet;
}

export default BuildFuzzySet;