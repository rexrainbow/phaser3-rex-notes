import FullWindowRectangle from '../../../fullwindowrectangle';

export default Cover;

declare namespace Cover {
    interface IConfig {
        /**
         * Fill color.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,
    }
}

/**
 * Full-window cover rectangle.
 */
declare class Cover extends FullWindowRectangle {
    /**
     * Create a cover rectangle.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Cover.IConfig
    );
}
