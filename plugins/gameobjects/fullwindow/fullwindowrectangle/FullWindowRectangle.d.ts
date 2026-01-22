// import * as Phaser from 'phaser';

export default FullWindowRectangle;

/**
 * Rectangle that always fills the game window.
 */
declare class FullWindowRectangle extends Phaser.GameObjects.Rectangle {
    /**
     * Create a full-window rectangle.
     * @param scene - The Scene to which this object belongs.
     * @param fillColor - Fill color.
     * @param fillAlpha - Fill alpha.
     */
    constructor(
        scene: Phaser.Scene,
        fillColor?: number,
        fillAlpha?: number
    );

    /**
     * Alpha value.
     */
    alpha: number;
    /**
     * Tint value.
     */
    tint: number;
}
