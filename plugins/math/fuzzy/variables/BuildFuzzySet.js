import { LeftShoulderFuzzySet } from '../../../utils/yuka/fuzzy/sets/LeftShoulderFuzzySet.js';
import { LeftSCurveFuzzySet } from '../../../utils/yuka/fuzzy/sets/LeftSCurveFuzzySet.js';
import { RightShoulderFuzzySet } from '../../../utils/yuka/fuzzy/sets/RightShoulderFuzzySet.js';
import { RightSCurveFuzzySet } from '../../../utils/yuka/fuzzy/sets/RightSCurveFuzzySet.js';
import { TriangularFuzzySet } from '../../../utils/yuka/fuzzy/sets/TriangularFuzzySet.js';
import { SingletonFuzzySet } from '../../../utils/yuka/fuzzy/sets/SingletonFuzzySet.js';
import { NormalDistFuzzySet } from '../../../utils/yuka/fuzzy/sets/NormalDistFuzzySet.js';

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