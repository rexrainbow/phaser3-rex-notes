// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';

export default BadgeLabel;

declare namespace BadgeLabel {

    /**
     * Configuration options for the badge-label layout.
     */
    interface IConfig extends OverlapSizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,
        /**
         * Main content game object.
         */
        main?: Phaser.GameObjects.GameObject,

        /**
         * Badge element at left-top anchor.
         */
        leftTop?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at center-top anchor.
         */
        centerTop?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at right-top anchor.
         */
        rightTop?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at left-center anchor.
         */
        leftCenter?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at center anchor.
         */
        center?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at right-center anchor.
         */
        rightCenter?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at left-bottom anchor.
         */
        leftBottom?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at center-bottom anchor.
         */
        centerBottom?: Phaser.GameObjects.GameObject,
        /**
         * Badge element at right-bottom anchor.
         */
        rightBottom?: Phaser.GameObjects.GameObject,
    }
}

/**
 * Overlap sizer that combines a main label with optional badge elements.
 */
declare class BadgeLabel extends OverlapSizer {

    /**
     * Create a badge label UI component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional badge-label configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: BadgeLabel.IConfig
    );
}
