import PathFinder from './../pathfinder/PathFinder.js';
import FindFOV from './FindFOV.js';
import IsInLOS from './IsInLOS.js';

class FieldOfView {
    constructor(gameObject, config) {
    }
}

var methods = {
    findFOV: FindFOV,
    isInLOS: IsInLOS,
    findArea: FindArea,
};
Object.assign(
    FieldOfView.prototype,
    methods
);

export default FieldOfView;