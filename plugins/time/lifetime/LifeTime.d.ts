import Clock from "../clock/Clock";

export default LifeTime;

declare namespace LifeTime {
    /**
     * Configuration options for creating a LifeTime.
     */
    interface IConfig {
        /**
         * Lifetime duration in milliseconds.
         */
        lifeTime?: number,
        /**
         * Destroy the game object on completion.
         */
        destroy?: boolean,
        /**
         * Start immediately.
         */
        start?: boolean
    }

    namespace Events {
        /**
         * Complete callback signature.
         *
         * @param gameObject - Target game object.
         * @param lifeTime - LifeTime instance.
         */
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            lifeTime: LifeTime
        ) => void;
    }
}

/**
 * Tracks a game object's lifetime.
 */
declare class LifeTime extends Clock {
    /**
     * Create a LifeTime tracker.
     *
     * @param gameObject - Target game object.
     * @param config - Configuration options.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: LifeTime.IConfig
    );
    /**
     * Target game object.
     */
    readonly gameObject: Phaser.GameObjects.GameObject;

    /**
     * Set lifetime duration.
     *
     * @param time - Duration in milliseconds.
     * @returns This LifeTime instance.
     */
    setLifeTime(time: number): this;
    /**
     * Add to lifetime duration.
     *
     * @param time - Duration to add in milliseconds.
     * @returns This LifeTime instance.
     */
    addToLifeTime(time: number): this;
    /**
     * Lifetime duration in milliseconds.
     */
    readonly lifeTime: number;
    /**
     * Remaining time in milliseconds.
     */
    readonly remainder: number;
    /**
     * Whether the object is still alive.
     */
    readonly isAlive: boolean;


}
