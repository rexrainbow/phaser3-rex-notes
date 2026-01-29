import TickTask from '../../utils/componentbase/TickTask';

export default EightDirection;

declare namespace EightDirection {

    /**
     * Direction mode identifiers.
     */
    type DirectionModeType = 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir';
    /**
     * Cursor key set.
     */
    type CursorKeys = {
        /**
         * Up key.
         */
        up: Phaser.Input.Keyboard.Key,
        /**
         * Down key.
         */
        down: Phaser.Input.Keyboard.Key,
        /**
         * Left key.
         */
        left: Phaser.Input.Keyboard.Key,
        /**
         * Right key.
         */
        right: Phaser.Input.Keyboard.Key
    }

    /**
     * EightDirection configuration.
     */
    interface IConfig {
        /**
         * Move speed.
         */
        speed?: number,
        /**
         * Direction mode.
         */
        dir?: DirectionModeType,
        /**
         * True to rotate toward direction.
         */
        rotateToDirection?: boolean,
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * True to wrap at bounds.
         */
        wrap?: boolean,
        /**
         * Padding for wrapping.
         */
        padding?: number,
        /**
         * Cursor keys.
         */
        cursorKeys?: CursorKeys
    }
}

/**
 * Eight-direction movement component.
 */
declare class EightDirection extends TickTask {
    /**
     * Create an EightDirection component.
     * @param gameObject - Target game object.
     * @param config - EightDirection configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EightDirection.IConfig
    );

    /**
     * Enable or disable the component.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set cursor keys.
     * @param cursorKeys - Cursor keys set.
     * @returns This instance.
     */
    setCursorKeys(
        cursorKeys: EightDirection.CursorKeys
    ): this;
    /**
     * Cursor keys set.
     */
    cursorKeys: EightDirection.CursorKeys;

    /**
     * Set move speed.
     * @param speed - Speed value.
     * @returns This instance.
     */
    setSpeed(speed: number): this;
    /**
     * Move speed value.
     */
    speed: number;

    /**
     * Enable or disable rotate to target.
     * @param enable - True to rotate to target.
     * @returns This instance.
     */
    setRotateToTarget(enable?: boolean): this;
    /**
     * True to rotate to target.
     */
    rotateToTarget: boolean;

    /**
     * Set direction mode.
     * @param dir - Direction mode.
     * @returns This instance.
     */
    setDirMode(dir: EightDirection.DirectionModeType): this;
    /**
     * Direction mode value.
     */
    dirMode: number;

    /**
     * Set wrap mode.
     * @param wrap - True to enable wrap.
     * @param padding - Wrap padding.
     * @returns This instance.
     */
    setWrapMode(
        wrap?: boolean,
        padding?: number
    ): this;
    /**
     * True if wrap mode is enabled.
     */
    wrap: boolean;
    /**
     * Wrap padding value.
     */
    padding: number;

    /**
     * True if moving left.
     */
    readonly isLeft: boolean;
    /**
     * True if moving right.
     */
    readonly isRight: boolean;
    /**
     * True if moving up.
     */
    readonly isUp: boolean;
    /**
     * True if moving down.
     */
    readonly isDown: boolean;
}
