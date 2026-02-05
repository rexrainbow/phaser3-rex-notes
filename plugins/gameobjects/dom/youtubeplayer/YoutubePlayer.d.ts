export default YoutubePlayer;

declare namespace YoutubePlayer {

    /**
     * Configuration options for creating a YouTube player.
     */
    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * Initial YouTube video id.
         */
        videoId?: string,
        /**
         * Set to true to auto play after loading.
         */
        autoPlay?: boolean,
        /**
         * Set to true to show player controls.
         */
        controls?: boolean,
        /**
         * Set to true to allow keyboard control.
         */
        keyboardControl?: boolean,
        /**
         * Set to true to use modest branding mode.
         */
        modestBranding?: boolean,
        /**
         * Set to true to loop playback.
         */
        loop?: boolean,
    }

    /**
     * Event callback types emitted by YouTube player.
     */
    namespace Events {
        /**
         * Callback fired when playback starts.
         */
        type PlayingCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
        /**
         * Callback fired when playback pauses.
         */
        type PauseCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
        /**
         * Callback fired when playback ends.
         */
        type EndedCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
        /**
         * Callback fired when player is buffering.
         */
        type BufferingCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
        /**
         * Callback fired when player is cued.
         */
        type CuedCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
        /**
         * Callback fired on playback error.
         */
        type ErrorCallbackType = (
            /**
             * YouTube player instance.
             */
            player: YoutubePlayer
        ) => void;
    }
}

/**
 * DOM-based YouTube player game object.
 */
declare class YoutubePlayer extends Phaser.GameObjects.DOMElement {
    /**
     * Create a YouTube player with explicit bounds.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional player configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        config?: YoutubePlayer.IConfig
    );

    /**
     * Create a YouTube player with position and config.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param config - Optional player configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: YoutubePlayer.IConfig
    );

    /**
     * Create a YouTube player with config only.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional player configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: YoutubePlayer.IConfig
    );

    /**
     * Load a video id into player.
     *
     * @param videoId - YouTube video id.
     * @param autoPlay - Set to true to start playback immediately.
     * @returns This player instance.
     */
    load(
        videoId: string,
        autoPlay?: boolean
    ): this;

    /**
     * Start playback.
     *
     * @returns This player instance.
     */
    play(): this;
    /**
     * Pause playback.
     *
     * @returns This player instance.
     */
    pause(): this;

    /**
     * Seek to playback time.
     *
     * @param time - Target time in seconds.
     * @returns This player instance.
     */
    setPlaybackTime(time: number): this;
    /**
     * Current playback time in seconds.
     */
    playbackTime: number;

    /**
     * Set normalized playback position.
     *
     * @param t - Normalized value in range 0 to 1.
     * @returns This player instance.
     */
    setT(t: number): this;
    /**
     * Current normalized playback position.
     */
    t: number;

    /**
     * Duration of loaded video in seconds.
     */
    readonly duration: number;

    /**
     * Set player volume.
     *
     * @param volume - Volume value.
     * @returns This player instance.
     */
    setVolume(volume: number): this;
    /**
     * Current volume value.
     */
    volume: number;

    /**
     * Set mute state.
     *
     * @param muted - True to mute audio.
     * @returns This player instance.
     */
    setMute(muted?: boolean): this;
    /**
     * Current mute state.
     */
    muted: boolean;

    /**
     * Set loop state.
     *
     * @param loop - True to enable loop playback.
     * @returns This player instance.
     */
    setLoop(loop?: boolean): this;
    /**
     * Current loop state.
     */
    loop: boolean;

    /**
     * Resize player element.
     *
     * @param width - New width.
     * @param height - New height.
     * @returns This player instance.
     */
    resize(
        width: number,
        height: number
    ): this;

    /**
     * True when player is currently playing.
     */
    readonly isPlaying: boolean;
    /**
     * True when player is currently paused.
     */
    readonly isPaused: boolean;
    /**
     * True when playback has ended.
     */
    readonly hasEnded: boolean;
    /**
     * Current raw video state code.
     */
    readonly videoState: number;
    /**
     * Current video state as string.
     */
    readonly videoStateString: string;

}
