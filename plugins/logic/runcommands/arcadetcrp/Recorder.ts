import BaseRecorder from '../tcrp/Recorder';
import ArcadeStepClock from '../../../time/clock/ArcadeStepClock';

class Recorder extends BaseRecorder {
    constructor(parent?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.clock = new ArcadeStepClock(parent);
        super(parent, config);
    }
}

export default Recorder;