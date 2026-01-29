import TickTask from '../../utils/componentbase/TickTask';

export default Ship;

declare namespace Ship {

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
     * Ship configuration.
     */
    interface IConfig {

        /**
         * Maximum speed.
         */
        maxSpeed?: number,
        /**
         * Acceleration value.
         */
        acceleration?: number,
        /**
         * Drag value.
         */
        drag?: number,
        /**
         * Turn speed value.
         */
        turnSpeed?: number,
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
 * Ship movement component.
 */
declare class Ship extends TickTask {
    /**
     * Create a Ship component.
     * @param gameObject - Target game object.
     * @param config - Ship configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Ship.IConfig
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
        cursorKeys: Ship.CursorKeys
    ): this;
    /**
     * Cursor keys set.
     */
    cursorKeys: Ship.CursorKeys;

    /**
     * Set maximum speed.
     * @param maxSpeed - Max speed value.
     * @returns This instance.
     */
    setMaxSpeed(maxSpeed: number): this;
    /**
     * Maximum speed.
     */
    maxSpeed: number;

    /**
     * Set acceleration.
     * @param acceleration - Acceleration value.
     * @returns This instance.
     */
    setAcceleration(acceleration: number): this;
    /**
     * Acceleration value.
     */
    acceleration: number;

    /**
     * Set drag value.
     * @param drag - Drag value.
     * @returns This instance.
     */
    setDrag(drag: number): this;
    /**
     * Drag value.
     */
    drag: number;

    /**
     * Set turn speed.
     * @param angularVelocity - Turn speed value.
     * @returns This instance.
     */
    setTurnSpeed(angularVelocity: number): this;
    /**
     * Turn speed value.
     */
    angularVelocity: number;

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
