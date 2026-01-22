import ToggleSwitchShape from './ToggleSwitchShape';
import Click from '../../../input/button/Button';

export default ToggleSwitch;

declare namespace ToggleSwitch {
    interface IConfig extends ToggleSwitchShape.IConfig {
        /**
         * True to disable input toggling.
         */
        readOnly?: boolean;
        /**
         * Input configuration.
         */
        input?: Click.IConfig,
    }
}

/**
 * Toggle switch with input handling.
 */
declare class ToggleSwitch extends ToggleSwitchShape {
    /**
     * Create a toggle switch.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the toggle.
     * @param height - Height of the toggle.
     * @param color - Track color.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        color?: number,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Create a toggle switch.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the toggle.
     * @param height - Height of the toggle.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Create a toggle switch.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Read-only flag.
     */
    readOnly: boolean;
    /**
     * Set read-only flag.
     * @param readOnly - True to disable input toggling.
     * @returns This instance.
     */
    setReadOnly(readOnly?: boolean): this;
}
