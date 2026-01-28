import ComponentBase from '../ComponentBase';

export default TweenTask;

/**
 * Component that controls a Phaser tween lifecycle.
 */
declare class TweenTask extends ComponentBase {
    /**
     * Start the tween task with a tween configuration.
     *
     * @param config - Tween builder configuration.
     * @returns This TweenTask instance.
     */
    start(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): this;
    /**
     * Stop the tween task.
     *
     * @returns This TweenTask instance.
     */
    stop(): this;
    /**
     * Restart the tween task with a tween configuration.
     *
     * @param config - Tween builder configuration.
     * @returns This TweenTask instance.
     */
    restart(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): this;

    /**
     * Pause the tween task.
     *
     * @returns This TweenTask instance.
     */
    pause(): this;
    /**
     * Resume the tween task.
     *
     * @returns This TweenTask instance.
     */
    resume(): this;
    /**
     * Complete the tween task immediately.
     *
     * @returns This TweenTask instance.
     */
    complete(): this;
    /**
     * Whether the tween task is currently running.
     */
    readonly isRunning: boolean;
}
