import BaseClock from "./BaseClock";

export default ArcadeStepClock;

declare namespace ArcadeStepClock {
    /**
     * Configuration options for creating an ArcadeStepClock.
     */
    interface IConfig extends BaseClock.IConfig {
    }
}

/**
 * Clock implementation for arcade step timing.
 */
declare class ArcadeStepClock extends BaseClock {

}
