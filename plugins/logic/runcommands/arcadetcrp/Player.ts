import BasePlayer from '../tcrp/Player';
import ArcadeStepClock from '../../../time/clock/ArcadeStepClock';

class Player extends BasePlayer {
    constructor(parent?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.clock = new ArcadeStepClock(parent);
        config.timeUnit = 0; // Force timeUnit to 0
        config.dtMode = 0;   // Force dtMode to 0
        super(parent, config);
    }

    load(commands?: any, scope?: any, config?: any) {
        // No config argument
        super.load(commands, scope);
        return this;
    }
}

export default Player;