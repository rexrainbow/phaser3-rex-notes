import LeftShoulderFuzzySet from './sets/LeftShoulderFuzzySet';
import LeftSCurveFuzzySet from './sets/LeftSCurveFuzzySet';
import RightShoulderFuzzySet from './sets/RightShoulderFuzzySet';
import RightSCurveFuzzySet from './sets/RightSCurveFuzzySet';
import TriangularFuzzySet from './sets/TriangularFuzzySet';
import SingletonFuzzySet from './sets/SingletonFuzzySet';
import NormalDistFuzzySet from './sets/NormalDistFuzzySet';

const FuzzySetClasses = {
    leftShoulder: LeftShoulderFuzzySet,
    leftSCurve: LeftSCurveFuzzySet,

    rightShoulder: RightShoulderFuzzySet,
    rightSCurve: RightSCurveFuzzySet,

    triangular: TriangularFuzzySet,
    singleton: SingletonFuzzySet,
    normal: NormalDistFuzzySet
}

var BuildFuzzySet = function(config?: any, partType?: any) {
    var setType = config.type;
    if (setType === undefined) {
        setType = (partType === 0) ? 'leftShoulder' :  // Left part
            (partType === 2) ? 'rightShoulder' :       // Right part
                'triangular';                          // Middle part
    }

    var fuzzySet = new FuzzySetClasses[setType](...config.parameters);
    return fuzzySet;
}

export default BuildFuzzySet;