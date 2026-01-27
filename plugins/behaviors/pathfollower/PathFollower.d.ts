import ComponentBase from '../../utils/componentbase/ComponentBase';

export default PathFollower;

declare namespace PathFollower {

    /**
     * PathFollower configuration.
     */
    interface IConfig {
        /**
         * Path to follow.
         */
        path?: Phaser.Curves.Path,
        /**
         * Initial t value.
         */
        t?: number,
        /**
         * True to rotate to path.
         */
        rotateToPath?: boolean,
        /**
         * Rotation offset in radians.
         */
        rotationOffset?: number,
        /**
         * Angle offset in radians.
         */
        angleOffset?: number,

        /**
         * Spaced points config or true to enable.
         */
        spacedPoints?: {
            /**
             * Number of divisions.
             */
            divisions?: number,
            /**
             * Step rate.
             */
            stepRate?: number
        } | boolean
    }
}

/**
 * Path follower behavior for a game object.
 */
declare class PathFollower extends ComponentBase {
    /**
     * Create a PathFollower behavior.
     * @param gameObject - Target game object.
     * @param config - PathFollower configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFollower.IConfig
    );

    /**
     * Set t value along the path.
     * @param t - T value.
     * @returns This instance.
     */
    setT(t: number): this;
    /**
     * Current t value.
     */
    t: number;

    /**
     * Set path to follow.
     * @param path - Path instance.
     * @returns This instance.
     */
    setPath(path: Phaser.Curves.Path): this;
    /**
     * Current path.
     */
    path: Phaser.Curves.Path;

    /**
     * Set rotate-to-path settings.
     * @param rotateToPath - True to rotate to path.
     * @param rotationOffset - Rotation offset in radians.
     * @returns This instance.
     */
    setRotateToPath(
        rotateToPath: boolean,
        rotationOffset?: number
    ): this;
    /**
     * True to rotate to path.
     */
    rotateToPath: boolean;
    /**
     * Rotation offset in radians.
     */
    rotationOffset: number;

    /**
     * Set spaced points mode.
     * @param divisions - Divisions or true/false.
     * @param stepRate - Step rate.
     * @returns This instance.
     */
    setSpacedPointsMode(
        divisions?: number | boolean,
        stepRate?: number
    ): this;
}
