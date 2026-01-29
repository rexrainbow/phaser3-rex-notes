import TickTask from '../../utils/componentbase/TickTask';

export default MoveTo;

declare namespace MoveTo {

    /**
     * Configuration for MoveTo behavior.
     */
    interface IConfig {
        /**
         * Movement speed in pixels per second.
         */
        speed?: number,
        /**
         * Rotate the game object to face its movement direction.
         */
        rotateToTarget?: boolean
        /**
         * Queue new targets when already moving.
         */
        appendMode?: boolean
    }

    namespace Events {
        /**
         * Called when the movement task completes.
         */
        type CompleteCallbackType = (
            /**
             * The game object being moved.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * The MoveTo behavior instance.
             */
            moveTo: MoveTo
        ) => void;
    }
}

/**
 * Move a game object toward a target position with optional queuing.
 */
declare class MoveTo extends TickTask {
    /**
     * Create a MoveTo behavior.
     *
     * @param gameObject - The game object to move.
     * @param config - Optional configuration for the behavior.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MoveTo.IConfig
    )

    /**
     * Enable or disable this behavior.
     *
     * @param enable - Whether the behavior is active.
     */
    setEnable(enable?: boolean): this;
    /**
     * Whether the behavior is enabled.
     */
    enable: boolean;

    /**
     * Set target append mode.
     *
     * @param appendMode - True to queue new targets, false to replace.
     */
    setAppendMode(appendMode?: boolean): this;
    /**
     * Whether new targets are queued while moving.
     */
    appendMode: boolean;

    /**
     * Clear queued targets.
     */
    clearTargets(): this;

    /**
     * Move toward a target position.
     *
     * When append mode is enabled and the move is in progress, the new target
     * is queued after the current targets. When append mode is disabled, the
     * new target replaces any existing target and starts a new move.
     *
     * @param x - Target x coordinate.
     * @param y - Target y coordinate.
     */
    moveTo(
        x: number,
        y: number
    ): this;
    /**
     * Move toward a target position.
     *
     * When append mode is enabled and the move is in progress, the new target
     * is queued after the current targets. When append mode is disabled, the
     * new target replaces any existing target and starts a new move.
     *
     * @param config - Target position configuration.
     */
    moveTo(config: {
        /**
         * Target x coordinate.
         */
        x: number,
        /**
         * Target y coordinate.
         */
        y: number,
        /**
         * Movement speed override for this request.
         */
        speed?: number
    }): this;
    /**
     * Move to the game object's current position from a starting point.
     *
     * This clears any queued targets, starting a new move from scratch.
     *
     * @param x - Start x coordinate.
     * @param y - Start y coordinate.
     */
    moveFrom(
        x: number,
        y: number
    ): this;
    /**
     * Move to the game object's current position from a starting point.
     *
     * This clears any queued targets, starting a new move from scratch.
     *
     * @param config - Start position configuration.
     */
    moveFrom(config: {
        /**
         * Start x coordinate.
         */
        x: number,
        /**
         * Start y coordinate.
         */
        y: number,
        /**
         * Movement speed override for this request.
         */
        speed?: number
    }): this;
    /**
     * Move toward a direction and distance from the current reference position.
     *
     * In append mode, angle and distance are relative to the last queued
     * target position. Otherwise they are relative to the current game object
     * position.
     *
     * @param angle - Movement angle in radians.
     * @param distance - Movement distance.
     */
    moveToward(
        angle: number,
        distance: number
    ): this;

    /**
     * Set the movement speed.
     *
     * @param speed - Movement speed in pixels per second.
     */
    setSpeed(speed: number): this;
    /**
     * Movement speed in pixels per second.
     */
    speed: number;

    /**
     * Set whether to rotate toward the movement direction.
     *
     * @param enable - True to rotate toward the target direction.
     */
    setRotateToTarget(enable?: boolean): this;
    /**
     * Whether to rotate toward the movement direction.
     */
    rotateToTarget: boolean;
}
