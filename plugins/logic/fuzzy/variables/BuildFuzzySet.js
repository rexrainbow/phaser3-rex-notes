import {
    LeftShoulderFuzzySet, LeftSCurveFuzzySet,
    RightShoulderFuzzySet, RightSCurveFuzzySet,
    TriangularFuzzySet, SingletonFuzzySet, NormalDistFuzzySet,
} from 'yuka/build/yuka.module';

const FuzzySetClasses = {
    leftShoulder: LeftShoulderFuzzySet,
    leftSCurve: LeftSCurveFuzzySet,

    rightShoulder: RightShoulderFuzzySet,
    rightSCurve: RightSCurveFuzzySet,

    triangular: TriangularFuzzySet,
    singleton: SingletonFuzzySet,
    normal: NormalDistFuzzySet
}

var BuildFuzzySet = function (partType, setType, left, middle, right) {
    if (setType === undefined) {
        setType = (partType === 0) ? 'leftShoulder' :  // Left part
            (partType === 2) ? 'rightShoulder' :       // Right part
                'triangular';                          // Middle part
    }

    var fuzzySet = new FuzzySetClasses[setType](left, middle, right);
    return fuzzySet;
}

export default BuildFuzzySet;