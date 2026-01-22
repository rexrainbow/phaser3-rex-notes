// import * as Phaser from 'phaser';
import DynamicText from '../dynamictext/DynamicText';
import Parser from '../../../bracketparser';
import Managers from '../../../logic/runcommands/managers/Managers';

export default TextPlayer;

declare namespace TextPlayer {

    /**
     * Translate tag name callback.
     * @param s - Raw tag name.
     * @returns Translated tag name.
     */
    type TranslateTagNameCallbackType = (s: string) => string;
    /**
     * Animation start callback.
     * @param child - Render child.
     */
    type OnStartCallbackType = (child: DynamicText.RenderChildTypes) => void;
    /**
     * Animation progress callback.
     * @param child - Render child.
     * @param t - Progress value.
     */
    type OnProgressCallbackType = (child: DynamicText.RenderChildTypes, t: number) => void;
    /**
     * Animation complete callback.
     * @param child - Render child.
     */
    type OnCompleteCallbackType = (child: DynamicText.RenderChildTypes) => void;
    /**
     * Typing start callback.
     * @param children - Render children.
     */
    type OnTypingStartCallbackType = (children: DynamicText.RenderChildTypes[]) => void;
    /**
     * Fade out page callback.
     * @param children - Render children.
     * @returns Completion signal.
     */
    type FadeOutPageCallbackType = (children: DynamicText.RenderChildTypes[])
        => void | Phaser.Events.EventEmitter | Promise<any>


    interface IConfigParser {
        /**
         * Tag delimiters.
         */
        delimiters?: string,
        /**
         * Comment tag name.
         */
        comment?: string,
        /**
         * Translate tag names.
         */
        translateTagNameCallback?: TranslateTagNameCallbackType,
    }

    interface IAnimation {
        /**
         * Animation duration.
         */
        duration?: number,
        /**
         * True to yoyo animation.
         */
        yoyo?: boolean,
        /**
         * Callback on animation start.
         */
        onStart?: OnStartCallbackType,
        /**
         * Callback on animation progress.
         */
        onProgress: OnProgressCallbackType,
        /**
         * Callback on animation complete.
         */
        onComplete: OnCompleteCallbackType
    }

    interface IConfigTyping {
        /**
         * Typing speed.
         */
        speed?: number,
        /**
         * Callback on typing start.
         */
        onTypingStart?: OnTypingStartCallbackType,
        /**
         * Per-character animation config.
         */
        animation?: IAnimation,
        /**
         * True to skip spaces when typing.
         */
        skipSpace?: boolean,
        /**
         * True to enable min size behavior.
         */
        minSizeEnable?: boolean,

        /**
         * Callback to fade out a page.
         */
        fadeOutPage?: FadeOutPageCallbackType;
    }

    interface IConfigImages {
        [name: string]: {
            /**
             * Image width.
             */
            width?: number,
            /**
             * Image height.
             */
            height?: number,
            /**
             * Texture key.
             */
            key?: string,
            /**
             * Frame name.
             */
            frame?: string
        }
    }

    interface ISpriteGameObjectConfig {
        /**
         * Create game object type or callback.
         */
        createGameObject?: 'sprite' | 'image' | Managers.CreateGameObjectCallbackType,

        /**
         * Fade config or duration.
         */
        fade?: number | {
            /**
             * Fade mode.
             */
            mode?: 0 | 1 | 'tint' | 'alpha',
            /**
             * Fade time.
             */
            time?: number
        },

        /**
         * Use viewport coordinates.
         */
        viewportCoordinate?: boolean | {
            /**
             * Enable viewport coordinates.
             */
            enable?: boolean,
            /**
             * Viewport rectangle.
             */
            viewport?: Phaser.Geom.Rectangle
        },

        /**
         * Default layer name.
         */
        defaultLayer?: string,
    }

    /**
     * Input type for next page.
     */
    type NextPageInputTypes = string | ((callback: Function) => void) | null;

    /**
     * Click target types.
     */
    type ClickTrgetTypes = Phaser.GameObjects.GameObject | Phaser.Scene;

    interface IConfig extends DynamicText.IConfig, Managers.IConfig {
        /**
         * Parser configuration.
         */
        parser?: IConfigParser,

        /**
         * Typing configuration.
         */
        typing?: IConfigTyping,

        /**
         * Image definitions.
         */
        images?: IConfigImages,

        /**
         * Sprite configuration.
         */
        sprites?: ISpriteGameObjectConfig | false,

        /**
         * Next page input config.
         */
        nextPageInput?: NextPageInputTypes,

        /**
         * Initial text content.
         */
        text?: string
    }

    namespace Events {
        /**
         * Fired when typing completes.
         */
        type TypingCompleteCallbackType = () => void;

        /**
         * Fired for each typed child.
         */
        type TypingChildCallbackType = (
            child: DynamicText.RenderChildTypes
        ) => void

        /**
         * Fired when a page starts.
         */
        type PageStartCallbackType = () => void;

        /**
         * Fired when a page completes.
         */
        type PageCompleteCallbackType = () => void;

        /**
         * Fired when waiting for click.
         */
        type WaitClickCallbackType = () => void;

        /**
         * Fired when waiting for key down.
         */
        type WaitKeyDownCallbackType = (keyName: string) => void;

        /**
         * Fired when waiting for time.
         */
        type WaitTimeCallbackType = (time: number) => void;

        /**
         * Fired when waiting for music complete.
         */
        type WaitMusicCompleteCallbackType = (
            music: Phaser.Sound.BaseSound
        ) => void;

        /**
         * Fired when waiting for camera effect complete.
         */
        type WaitCameraEffectCompleteCallbackType = (effectName: string) => void;

        /**
         * Fired when waiting for sprite action complete.
         */
        type WaitSpriteActionCompleteCallbackType = (name?: string, prop?: string) => void;

        /**
         * Fired for a custom wait callback.
         */
        type WaitCallbackType = (
            callback: () => void
        ) => void;

        /**
         * Parse custom tag on callback.
         */
        type ParseCustomTagOnCallbackType = (parser: Parser, ...values: any) => void;
        /**
         * Execute custom tag on callback.
         */
        type ExecuteCustomTagOnCallbackType = (...values: any) => void;
        /**
         * Parse custom tag off callback.
         */
        type ParseCustomTagOffCallbackType = (parser: Parser) => void;
        /**
         * Execute custom tag off callback.
         */
        type ExecuteCustomTagOffCallbackType = () => void;
    }
}

/**
 * Dynamic text player with typing, parsing, and paging support.
 */
declare class TextPlayer extends DynamicText {
    /**
     * Create a text player.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param fixedWidth - Fixed width.
     * @param fixedHeight - Fixed height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        fixedWidth?: number, fixedHeight?: number,
        config?: TextPlayer.IConfig
    );
    /**
     * Create a text player.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: TextPlayer.IConfig
    );

    /**
     * Add a game object manager.
     * @param config - Manager configuration.
     * @returns This instance.
     */
    addGameObjectManager(config: Managers.IAddGameObjectManagerConfig): this;

    /**
     * Play content.
     * @param content - Content to play.
     * @returns This instance.
     */
    play(content: string): this;
    /**
     * Play content and return a promise.
     * @param content - Content to play.
     * @returns A promise that resolves when complete.
     */
    playPromise(content: string): Promise<any>;

    /**
     * Show current page immediately.
     * @returns This instance.
     */
    showPage(): this;
    /**
     * Continue typing to next page.
     * @returns This instance.
     */
    typingNextPage(): this;

    /**
     * Pause typing.
     * @returns This instance.
     */
    pauseTyping(): this;
    /**
     * Resume typing.
     * @returns This instance.
     */
    resumeTyping(): this;

    /**
     * Pause playback.
     * @returns This instance.
     */
    pause(): this;
    /**
     * Resume playback.
     * @returns This instance.
     */
    resume(): this;

    /**
     * Set typing speed.
     * @param speed - Typing speed.
     * @returns This instance.
     */
    setTypingSpeed(speed: number): this;
    /**
     * Current typing speed.
     */
    typingSpeed: number;
    /**
     * Set time scale.
     * @param timeScale - Time scale value.
     * @returns This instance.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Current time scale.
     */
    timeScale: number;

    /**
     * True if playing.
     */
    readonly isPlaying: boolean;
    /**
     * True if page is typing.
     */
    readonly isPageTyping: boolean;

    /**
     * Add image definitions.
     * @param config - Image config map.
     * @returns This instance.
     */
    addImage(config: TextPlayer.IConfigImages): this;

    /**
     * Ignore next page input.
     * @param enable - True to ignore.
     * @returns This instance.
     */
    ignoreNextPageInput(enable?: boolean): this;
    /**
     * Set click target.
     * @param clickTarget - Click target.
     * @returns This instance.
     */
    setClickTarget(clickTarget: TextPlayer.ClickTrgetTypes): this;
    /**
     * Current click target.
     */
    readonly clickTarget: TextPlayer.ClickTrgetTypes;

    /**
     * Set camera target.
     * @param camera - Camera target.
     * @returns This instance.
     */
    setCameraTarget(camera: Phaser.Cameras.Scene2D.BaseCamera): this;
    /**
     * Current camera target.
     */
    readonly cameraTarget: Phaser.Cameras.Scene2D.BaseCamera;

    /**
     * Get a game object by type and name.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @returns The game object.
     */
    getGameObject(
        goType: string,
        name: string
    ): Phaser.GameObjects.GameObject;
    /**
     * Get all game objects of a type.
     * @param goType - Game object type.
     * @returns Game object map.
     */
    getGameObject(
        goType: string,
    ): { [name: string]: Phaser.GameObjects.GameObject }
    /**
     * Add a game object.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param gameObject - Game object instance.
     * @returns This instance.
     */
    addGameObject(
        goType: string,
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
}
