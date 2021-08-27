import LeftShoulderFuzzySet from './sets/LeftShoulderFuzzySet.js';
import LeftSCurveFuzzySet from './sets/LeftSCurveFuzzySet.js';
import RightShoulderFuzzySet from './sets/RightShoulderFuzzySet.js';
import RightSCurveFuzzySet from './sets/RightSCurveFuzzySet.js';
import TriangularFuzzySet from './sets/TriangularFuzzySet.js';
import SingletonFuzzySet from './sets/SingletonFuzzySet.js';
import NormalDistFuzzySet from './sets/NormalDistFuzzySet.js';

const FuzzySetClasses = {
    leftShoulder: LeftShoulderFuzzySet,
    leftSCurve: LeftSCurveFuzzySet,

    rightShoulder: RightShoulderFuzzySet,
    rightSCurve: RightSCurveFuzzySet,

    triangular: TriangularFuzzySet,
    singleton: SingletonFuzzySet,
    normal: NormalDistFuzzySet
}

var BuildFuzzySet = function (left, middle, right, setType, partType) {
    if (setType === undefined) {
        setType = (partType === 0) ? 'leftShoulder' :  // Left part
            (partType === 2) ? 'rightShoulder' :       // Right part
                'triangular';                          // Middle part
    }

    var fuzzySet = new FuzzySetClasses[setType](left, middle, right);
    return fuzzySet;
}

export default BuildFuzzySet;