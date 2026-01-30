import BaseClock from "./BaseClock";

export default Clock;

declare namespace Clock {
    /**
     * Configuration options for creating a Clock.
     */
    interface IConfig extends BaseClock.IConfig {
    }
}

/**
 * Clock implementation based on BaseClock.
 */
declare class Clock extends BaseClock {

}
