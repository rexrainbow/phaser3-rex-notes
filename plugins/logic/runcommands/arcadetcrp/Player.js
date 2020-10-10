import BasePlayer from '../tcrp/Player.js';
import ArcadeStepClock from '../../../time/clock/ArcadeStepClock';

class Player extends BasePlayer {
    constructor(parent, config) {
        if (config === undefined) {
            config = {};
        }
        config.clockClass = ArcadeStepClock;
        super(parent, config);
    }

}

export default Player;