import ComponentBase from '../../../utils/componentbase/ComponentBase';

export default Recorder;

declare namespace Recorder {
    /**
     * Configuration options for creating a Recorder.
     */
    interface IConfig {

    }
}

/**
 * Timed command recorder.
 */
declare class Recorder extends ComponentBase {
    /**
     * Create a Recorder.
     *
     * @param parent - Parent scene or game object.
     */
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject
    );

    /**
     * Start recording.
     *
     * @param startAt - Start time.
     * @returns This Recorder instance.
     */
    start(startAt?: number): this;

    /**
     * Add a recorded command.
     *
     * @param command - Command array.
     * @param offset - Time offset.
     * @returns This Recorder instance.
     */
    addCommand(
        command: any[],
        offset?: number
    ): this;

    /**
     * Get recorded commands.
     *
     * @param isRef - Return by reference.
     * @returns Recorded command list.
     */
    getCommands(isRef?: boolean): any[];

    /**
     * Clear recorded commands.
     *
     * @returns This Recorder instance.
     */
    clear(): this;

    /**
     * Pause recording.
     *
     * @returns This Recorder instance.
     */
    pause(): this;
    /**
     * Resume recording.
     *
     * @returns This Recorder instance.
     */
    resume(): this;
    /**
     * Stop recording.
     *
     * @returns This Recorder instance.
     */
    stop(): this;

    /**
     * Seek recording time.
     *
     * @param time - Target time.
     * @returns This Recorder instance.
     */
    seek(time: number): this;

    /**
     * Whether recording is active.
     */
    readonly isRecording: boolean;
    /**
     * Current recording time.
     */
    readonly now: number;

    /**
     * Set recording time scale.
     *
     * @param timeScale - Time scale value.
     * @returns This Recorder instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Recording time scale.
     */
    timeScale: number;

}
