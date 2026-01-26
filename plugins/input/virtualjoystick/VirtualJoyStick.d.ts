// import * as Phaser from 'phaser';

export default VirtualJoyStick;

declare namespace VirtualJoyStick {

    /**
     * Direction mode identifiers.
     */
    type DirTypes = 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir';

    /**
     * VirtualJoyStick configuration.
     */
    export interface IConfig {
        /**
         * Joystick x.
         */
        x?: number,
        /**
         * Joystick y.
         */
        y?: number,
        /**
         * Joystick radius.
         */
        radius?: number,

        /**
         * Base game object.
         */
        base?: Phaser.GameObjects.GameObject,
        /**
         * Thumb game object.
         */
        thumb?: Phaser.GameObjects.GameObject,
        /**
         * Direction mode.
         */
        dir?: DirTypes,

        /**
         * Minimum force value.
         */
        forceMin?: number,
        /**
         * True to keep joystick fixed.
         */
        fixed?: boolean,
        /**
         * True to enable.
         */
        enable?: boolean,
    }

    namespace Events {
        /**
         * Update callback.
         */
        type UpdateCallbackType = () => void;
    }
}

/**
 * Virtual joystick input component.
 */
declare class VirtualJoyStick extends Phaser.Events.EventEmitter {
    /**
     * Create a VirtualJoyStick.
     * @param scene - The Scene to which this joystick belongs.
     * @param config - VirtualJoyStick configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: VirtualJoyStick.IConfig
    );

    /**
     * Create cursor keys.
     * @returns Cursor key objects.
     */
    createCursorKeys(): {
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
        right: Phaser.Input.Keyboard.Key,
    };

    /**
     * Destroy this joystick.
     */
    destroy(): void;

    /**
     * Enable or disable the joystick.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enable state.
     * @returns This instance.
     */
    toggleEnable(): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set visibility.
     * @param visible - True to show.
     * @returns This instance.
     */
    setVisible(visible?: boolean): this;
    /**
     * Toggle visibility.
     * @returns This instance.
     */
    toggleVisible(): this;
    /**
     * True if visible.
     */
    visible: boolean;

    /**
     * Set joystick position.
     * @param x - Joystick x.
     * @param y - Joystick y.
     * @returns This instance.
     */
    setPosition(x: number, y: number): this;
    /**
     * Joystick x.
     */
    x: number;
    /**
     * Joystick y.
     */
    y: number;

    /**
     * Set scroll factor.
     * @param factor - Scroll factor.
     * @returns This instance.
     */
    setScrollFactor(factor: number): this;

    /**
     * Base game object.
     */
    base: Phaser.GameObjects.GameObject;
    /**
     * Thumb game object.
     */
    thumb: Phaser.GameObjects.GameObject;

    /**
     * True if left is active.
     */
    readonly left: boolean;
    /**
     * True if right is active.
     */
    readonly right: boolean;
    /**
     * True if up is active.
     */
    readonly up: boolean;
    /**
     * True if down is active.
     */
    readonly down: boolean;
    /**
     * True if no direction is active.
     */
    readonly noKey: boolean;
    /**
     * Force magnitude.
     */
    readonly force: number;
    /**
     * Force x component.
     */
    readonly forceX: number;
    /**
     * Force y component.
     */
    readonly forceY: number;
    /**
     * Direction angle in radians.
     */
    readonly angle: number;
    /**
     * Rotation in radians.
     */
    readonly rotation: number;
    /**
     * Pointer x.
     */
    readonly pointerX: number;
    /**
     * Pointer y.
     */
    readonly pointerY: number;
    /**
     * Active pointer.
     */
    readonly pointer: Phaser.Input.Pointer;
}
