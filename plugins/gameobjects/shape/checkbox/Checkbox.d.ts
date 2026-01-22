import CheckboxShape from './CheckboxShape';
import Click from '../../../input/button/Button';

export default Checkbox;

declare namespace Checkbox {
    interface IConfig extends CheckboxShape.IConfig {
        /**
         * True to disable interaction changes.
         */
        readOnly?: boolean;
        /**
         * Input configuration.
         */
        input?: Click.IConfig,
    }
}

/**
 * Checkbox with click input handling.
 */
declare class Checkbox extends CheckboxShape {
    /**
     * Create a checkbox.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     * @param color - Checked color.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        color?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: Checkbox.IConfig
    );

    /**
     * Create a checkbox from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Checkbox.IConfig
    );

    /**
     * Enable or disable read-only mode.
     * @param readOnly - True to enable.
     * @returns This instance.
     */
    setReadOnly(readOnly?: boolean): this;
    /**
     * Read-only flag.
     */
    readOnly: boolean;
}
