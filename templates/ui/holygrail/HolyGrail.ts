import Sizer from '../sizer/Sizer';
import Build from './methods/Build'

class HolyGrail extends Sizer {
    build: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1; // top-to-bottom
        // Create sizer
        super(scene, config);
        this.type = 'rexHolyGrail';

        this.build(config);
    }
}

var methods = {
    build: Build,
}

Object.assign(
    HolyGrail.prototype,
    methods,
)

export default HolyGrail;